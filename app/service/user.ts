import { UserProfile } from "@auth0/nextjs-auth0/client";

export interface GyCodingUser {
  username: string | null;
  email: string;
  picture: string;
  roles: string[];
  phoneNumber: string | null;
}

export async function getUser(): Promise<{ auth0User: UserProfile; gyCodingUser: GyCodingUser } | null> {
  try {
    // Primero obtenemos el usuario de Auth0
    const auth0Response = await fetch('/api/auth/me');
    if (!auth0Response.ok) {
      if (auth0Response.status === 401) {
        return null; // Usuario no autenticado
      }
      throw new Error('Error fetching Auth0 user');
    }
    const auth0User = await auth0Response.json();

    // Si tenemos usuario de Auth0, obtenemos los datos adicionales de GyCoding
    const gyCodingResponse = await fetch('/api/auth/get');
    if (!gyCodingResponse.ok) {
      throw new Error('Error fetching GyCoding user data');
    }
    const gyCodingData = await gyCodingResponse.json();
    console.log(gyCodingData);
    return {
      auth0User,
      gyCodingUser: gyCodingData.data
    };
  } catch (error) {
    console.error('Error in getUser:', error);
    throw error;
  }
}