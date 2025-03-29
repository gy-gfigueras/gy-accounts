import { User, UserUpdateData } from '../domain/user';

export async function getUser(): Promise<User> {
  try {
    const response = await fetch('/api/auth/get');

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    const user: User = data.gyCodingUser;
    //  const user: User = {
    //   username: 'GFIGUERAS',
    //   email: 'gfigueras@gycoding.com',
    //   picture: '/GYLOGO-V7.png',
    //   roles: [ERole.DEVELOPER, ERole.ADMIN, ERole.COMMON],
    //   phoneNumber: '+34 695624408',
    // };
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
    console.log('Updated user data:', updatedUser);
    return updatedUser.gyCodingData;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}
