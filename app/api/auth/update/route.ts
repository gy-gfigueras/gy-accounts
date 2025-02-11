import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { sendLog } from "../../../utils/logs/logHelper";
import { ELevel } from "../../../utils/logs/ELevel";

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();

    await sendLog(ELevel.INFO, "Session has been received.", {
      user: session?.user?.sub,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "No active session found" },
        { status: 401 }
      );
    }

    if (!process.env.GY_API) {
      throw new Error("GY_API environment variable is not defined");
    }

    const body = await req.json();
    const { username, picture, phoneNumber } = body;
    console.log("Body:", body);

    const accessToken = session.accessToken;
    const baseUrl = process.env.GY_API.replace(/['"]/g, "");
    const apiUrl = `${baseUrl}/accounts/user/profile`;

    const gyCodingResponse = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        picture,
        phoneNumber,
      }),
    });

    if (!gyCodingResponse.ok) {
      const errorText = await gyCodingResponse.text();
      await sendLog(ELevel.ERROR, "Profile update failed.", {
        error: errorText,
      });
      throw new Error(`GyCoding API Error: ${errorText}`);
    }

    const gyCodingData = await gyCodingResponse.json();

    await sendLog(ELevel.INFO, "Profile has been updated.", {
      user: gyCodingData.username,
    });

    return NextResponse.json({
      gyCodingData,
      status: 200,
    });
  } catch (error) {
    console.error("Error in /api/auth/update:", error);
    await sendLog(ELevel.ERROR, "Error updating profile.", { error });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function generateStaticParams() {
  return [];
}
