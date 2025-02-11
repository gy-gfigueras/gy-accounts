import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { ELevel } from "../../../utils/logs/ELevel";
import { sendLog } from "../../../utils/logs/logHelper";

export const GET = withApiAuthRequired(async (req: NextRequest) => {
  try {
    const session = await getSession(req);

    await sendLog(ELevel.INFO, "Session has been received.", {
      user: session.user.sub,
    });

    if (!process.env.GY_API) {
      throw new Error("GY_API environment variable is not defined");
    }

    const accessToken = session?.accessToken;
    const baseUrl = process.env.GY_API.replace(/['"]/g, "");
    const apiUrl = `${baseUrl}/accounts/user/profile`;

    const gyCodingResponse = await fetch(apiUrl, {
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!gyCodingResponse.ok) {
      const errorText = await gyCodingResponse.text();
      await sendLog(ELevel.ERROR, "Profile could not be received", {
        error: errorText,
      });
      throw new Error(`GyCoding API Error: ${errorText}`);
    }

    const gyCodingData = await gyCodingResponse.json();
    await sendLog(ELevel.INFO, "Profile has been received.", {
      user: gyCodingData.username,
      status: gyCodingResponse.status,
    });

    return NextResponse.json({
      gyCodingUser: gyCodingData,
    });
  } catch (error) {
    console.error("Error in /api/auth/user:", error);

    await sendLog(ELevel.ERROR, "Profile could not be received.", {
      error: error,
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
});

export async function generateStaticParams() {
  return [];
}
