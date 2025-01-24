import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "error";

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { username, picture, phoneNumber } = body;
    console.log("Body:", body);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "No active session found" },
        { status: 401 }
      );
    }

    if (!process.env.GY_API) {
      throw new Error("GY_API environment variable is not defined");
    }

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
        username: username,
        picture: picture,
        phoneNumber: phoneNumber,
      }),
    });

    if (!gyCodingResponse.ok) {
      const errorText = await gyCodingResponse.text();
      throw new Error(`GyCoding API Error: ${errorText}`);
    }

    const gyCodingData = await gyCodingResponse.json();

    return NextResponse.json({
      gyCodingData,
      status: 200,
    });
  } catch (error) {
    console.error("Error in /api/auth/update:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function generateStaticParams() {
  return [];
}
