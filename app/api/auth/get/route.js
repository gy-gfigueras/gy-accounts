import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function GET(req) {
  try {
    // Obtener la sesión de Auth0
    const session = await getSession(req);
    if (!session?.accessToken) {
      return NextResponse.json(
        { status: 401, message: "No access token available" },
        { status: 401 }
      );
    }

    console.log(session.accessToken);
    if (!process.env.GY_API) {
      return NextResponse.json(
        {
          status: 500,
          message: "Server configuration error: API URL not defined",
        },
        { status: 500 }
      );
    }

    const baseUrl = process.env.GY_API.replace(/['"]/g, "");
    const apiUrl = `${baseUrl}/accounts/auth/get/profile`;

    // Hacer la petición a GyCoding API
    const gycodingResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${session.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Importante: no cachear la respuesta
    });

    const responseText = await gycodingResponse.text();

    if (!gycodingResponse.ok) {
      console.error("GyCoding API error:", responseText);
      return NextResponse.json(
        {
          status: gycodingResponse.status,
          message: `Failed to fetch user data: ${responseText}`,
        },
        { status: gycodingResponse.status }
      );
    }

    try {
      const userData = JSON.parse(responseText);
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: userData,
      });
    } catch (e) {
      console.error("Error parsing response:", e);
      return NextResponse.json(
        {
          status: 500,
          message: "Invalid response from GyCoding API",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in GET /api/auth/get:", error);
    return NextResponse.json(
      {
        status: 500,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
});
