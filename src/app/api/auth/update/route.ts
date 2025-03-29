import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { sendLog } from '@/utils/logs/logHelper';
import { ELevel } from '@/utils/constants/ELevel';
import { ELogs } from '@/utils/constants/ELogs';

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();

    await sendLog(ELevel.INFO, ELogs.SESSION_RECIVED, {
      user: session?.user?.sub,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: ELogs.NO_ACTIVE_SESSION },
        { status: 401 }
      );
    }

    if (!process.env.GY_API) {
      throw new Error(ELogs.ENVIROMENT_VARIABLE_NOT_DEFINED);
    }

    const body = await req.json();
    const { username, picture, phoneNumber } = body;
    const accessToken = session.accessToken;
    const baseUrl = process.env.GY_API.replace(/['"]/g, '');
    const apiUrl = `${baseUrl}/accounts/user/profile`;

    const gyCodingResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        picture,
        phoneNumber,
      }),
    });

    if (!gyCodingResponse.ok) {
      const errorText = await gyCodingResponse.text();
      await sendLog(ELevel.ERROR, ELogs.PROFILE_UPDATE_FAILED, {
        error: errorText,
      });
      throw new Error(`GyCoding API Error: ${errorText}`);
    }

    const gyCodingData = await gyCodingResponse.json();

    await sendLog(ELevel.INFO, ELogs.PROFILE_HAS_BEEN_UPDATED, {
      user: gyCodingData.username,
    });

    return NextResponse.json({
      gyCodingData,
      status: 200,
    });
  } catch (error) {
    console.error('Error in /api/auth/update:', error);
    await sendLog(ELevel.ERROR, ELogs.ERROR_UPDATING_PROFILE, { error });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : ELogs.UNKNOWN_ERROR },
      { status: 500 }
    );
  }
}

export async function generateStaticParams() {
  return [];
}
