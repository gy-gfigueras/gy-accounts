import { handleAuth } from "@auth0/nextjs-auth0";

export const GET = handleAuth();
export const dynamic = "error";

export async function generateStaticParams() {
  return [
    { auth0: "example" }, // Ajusta esto según tus necesidades
  ];
}
