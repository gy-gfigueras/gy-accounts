/* eslint-disable @typescript-eslint/no-explicit-any */
import { ELevel } from '@/utils/constants/ELevel';
import { ELogs } from '@/utils/constants/ELogs';
import { sendLog } from '@/utils/logs/logHelper';
import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

// ----------------------------------
// Helpers idénticos al otro archivo
// ----------------------------------

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

// ----------------------------------
// Handler PATCH adaptado
// ----------------------------------

export async function PATCH() {
  try {
    const session = await getSession();
    const { idToken, user } = session ?? {};

    await sendLog(ELevel.INFO, ELogs.SESSION_RECIVED, {
      user: user?.sub,
    });

    if (!session || !user) {
      return NextResponse.json(
        { error: ELogs.NO_ACTIVE_SESSION },
        { status: 401 }
      );
    }

    const baseUrl = getBaseApiUrl();
    const API_URL = `${baseUrl}/accounts/user/metadata/apikey`;
    const headers = getHeaders(idToken);

    await fetchFromGyCoding(API_URL, {
      method: 'PATCH',
      headers,
    });

    await sendLog(ELevel.INFO, ELogs.API_KEY_HAS_BEEN_UPDATED, {
      user: user.sub,
    });

    // Igual que el otro archivo: devolver JSON aunque sea 204
    return NextResponse.json({ success: true }, { status: 204 });
  } catch (error: any) {
    console.error('Error in /api/auth/metadata/apikey', error);

    await sendLog(ELevel.ERROR, ELogs.API_KEY_CANNOT_BE_UPDATED, {
      error: error instanceof Error ? error.message : error,
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : ELogs.UNKNOWN_ERROR },
      { status: 500 }
    );
  }
}

export async function generateStaticParams() {
  return [];
}
