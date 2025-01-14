/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const POST = withApiAuthRequired(async function POST(req: Request) {
  try {
    const session = await getSession();
    const { user } = session || {};

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();

    // Here you would typically update the user's metadata in Auth0
    // using the Management API
    // This is a placeholder for the actual implementation
    const auth0Response = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user.sub}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          user_metadata: {
            picture: data.picture,
          },
        }),
      }
    );

    if (!auth0Response.ok) {
      throw new Error("Failed to update user in Auth0");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return new NextResponse(error.message || "Internal Server Error", {
      status: 500,
    });
  }
});
