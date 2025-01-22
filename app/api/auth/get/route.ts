import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const GET = withApiAuthRequired(async (req: NextRequest) => {
  try {
    const session = await getSession(req);

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
      throw new Error(`GyCoding API Error: ${errorText}`);
    }

    const gyCodingData = await gyCodingResponse.json();

    return NextResponse.json({
      gyCodingUser: gyCodingData,
    });
  } catch (error) {
    console.error("Error in /api/auth/user:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
});
