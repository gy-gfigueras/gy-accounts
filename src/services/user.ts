import { User, UserUpdateData } from '../domain/user';

export async function getUser(): Promise<User> {
  try {
    const response = await fetch('/api/auth/get');

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    const user: User = data.gyCodingUser;
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function updateUser(data: UserUpdateData) {
  try {
    const response = await fetch('/api/auth/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update user data');
    }

    const updatedUser = await response.json();
    return updatedUser.gyCodingData;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}

export async function updateApiKey() {
  try {
    const response = await fetch('/api/auth/metadata/apikey', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update API KEY');
    }

    const updatedApiKey = await response.json();
    return updatedApiKey;
  } catch (error) {
    console.error('Error updating api key:', error);
    throw error;
  }
}
