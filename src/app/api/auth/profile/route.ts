/* eslint-disable @typescript-eslint/no-explicit-any */
import { ELevel } from '@/utils/constants/ELevel';
import { ELogs } from '@/utils/constants/ELogs';
import { sendLog } from '@/utils/logs/logHelper';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@gycoding/nebula';
import { NextRequest, NextResponse } from 'next/server';

function getBaseApiUrl() {
  const env = process.env.ENVIRONMENT;

  const urlMap: Record<string, string | undefined> = {
    DEVELOP: process.env.GY_API_DEVELOP,
    PRODUCTION: process.env.GY_API_PRODUCTION,
  };

  const url = urlMap[env || '']?.replace(/['"]/g, '');

  if (!url) throw new Error(ELogs.ENVIROMENT_VARIABLE_NOT_DEFINED);

  return url;
}

function getHeaders(idToken?: string) {
  if (!idToken) throw new Error('Missing idToken');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`,
  };
}

async function fetchFromGyCoding(url: string, options: RequestInit) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const message = `GyCoding API Error: ${response.status} - ${response.statusText}`;
    throw new Error(message);
  }

  return response;
}

async function handleGet(API_URL: string, headers: any) {
  const res = await fetchFromGyCoding(API_URL, { method: 'GET', headers });

  const profile: UserProfile = await res.json();

  return NextResponse.json(profile);
}

async function handlePut(request: NextRequest, API_URL: string, headers: any) {
  const body = await request.json();
  const { username, picture, phoneNumber } = body;

  try {
    const response = await fetchFromGyCoding(API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ username, picture, phoneNumber }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err: any) {
    await sendLog(ELevel.ERROR, 'ERROR UPDATING PROFILE');
    console.error(err);
    return NextResponse.json(
      { error: 'ERROR UPDATING PROFILE' },
      { status: 500 }
    );
  }
}

async function handler(request: NextRequest) {
  try {
    const { idToken } = (await getSession()) ?? {};
    const baseUrl = getBaseApiUrl();
    const API_URL = `${baseUrl}/accounts/user/profile`;
    const headers = getHeaders(idToken);

    switch (request.method) {
      case 'GET':
        return await handleGet(API_URL, headers);

      case 'PUT':
        return await handlePut(request, API_URL, headers);

      default:
        return NextResponse.json(
          { error: 'Method not allowed' },
          { status: 405 }
        );
    }
  } catch (error) {
    console.error('Error in /api/auth/profile', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : ELogs.UNKNOWN_ERROR },
      { status: 500 }
    );
  }
}

export const GET = withApiAuthRequired(handler);
export const PUT = withApiAuthRequired(handler);
