import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { sendLog } from '@/utils/logs/logHelper';
import { ELevel } from '@/utils/constants/ELevel';
import { ELogs } from '@/utils/constants/ELogs';
import { User } from '@/domain/user';

export const GET = withApiAuthRequired(async () => {
  try {
    const session = await getSession();

    if (session) {
      await sendLog(ELevel.INFO, ELogs.SESSION_RECIVED, {
        user: session.user.sub,
      });
    }

    if (!process.env.GY_API) {
      throw new Error(ELogs.ENVIROMENT_VARIABLE_NOT_DEFINED);
    }

    const accessToken = session?.accessToken;
    const baseUrl = process.env.GY_API.replace(/['"]/g, '');
    const apiUrl = `${baseUrl}/accounts/user/profile`;

    const gyCodingResponse = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!gyCodingResponse.ok) {
      const errorText = await gyCodingResponse.text();
      await sendLog(ELevel.ERROR, ELogs.PROFILE_COULD_NOT_BE_RECEIVED, {
        error: errorText,
      });
      throw new Error(`GyCoding API Error: ${errorText}`);
    }

    const gyCodingData = await gyCodingResponse.json();
    await sendLog(ELevel.INFO, ELogs.PROFILE_HAS_BEEN_RECEIVED, {
      user: gyCodingData.username,
      status: gyCodingResponse.status,
    });

    return NextResponse.json({
      gyCodingUser: gyCodingData as User,
    });
  } catch (error) {
    console.error('Error in /api/auth/user:', error);

    await sendLog(ELevel.ERROR, ELogs.PROFILE_COULD_NOT_BE_RECEIVED, {
      error: error,
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : ELogs.UNKNOWN_ERROR },
      { status: 500 }
    );
  }
});

export async function generateStaticParams() {
  return [];
}
