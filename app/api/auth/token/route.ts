import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function GET(req: Request) {
  try {
    const session = await getSession(req);
    if (!session?.accessToken) {
      return NextResponse.json(
        { status: 401, message: "No access token available" },
        { status: 401 }
      );
    }

    return NextResponse.json({ accessToken: session.accessToken });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 500,
        message: error instanceof Error ? error.message : "Internal Server Error"
      },
      { status: 500 }
    );
  }
});
