import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { sendLog } from '@/utils/logs/logHelper';
import { ELevel } from '@/utils/constants/ELevel';
import { ELogs } from '@/utils/constants/ELogs';

export async function PATCH() {
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

    const idToken = session.idToken;
    const baseUrl = process.env.GY_API.replace(/['"]/g, '');
    const apiUrl = `${baseUrl}/accounts/user/metadata/apikey`;
    const gyCodingResponse = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!gyCodingResponse.ok) {
      const errorText = await gyCodingResponse.text();

      await sendLog(ELevel.ERROR, ELogs.API_KEY_CANNOT_BE_UPDATED, {
        error: errorText,
      });
      throw new Error(`GyCoding API Error: ${errorText}`);
    }

    await sendLog(ELevel.INFO, ELogs.API_KEY_HAS_BEEN_UPDATED, {
      status: 204,
      message: 'API KEY HAS BEEN UPDATED',
    });

    return NextResponse.json({ status: '204' });
  } catch (error) {
    console.error('Error in /api/auth/metadata/apikey:', error);
    await sendLog(ELevel.ERROR, ELogs.API_KEY_CANNOT_BE_UPDATED, { error });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : ELogs.UNKNOWN_ERROR },
      { status: 500 }
    );
  }
}

export async function generateStaticParams() {
  return [];
}
