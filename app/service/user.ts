import { User } from "../types/user"

export async function getUser(): Promise<User> {
  try {
    const response = await fetch('/api/auth/get')

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

    const data = await response.json()
    const user : User = data.gyCodingUser
    return user
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

export async function updateUser(data: User) {
  const mockData: User = {
    username: "Guille",
    email: data.email,
    picture: data.picture,
    roles: data.roles,
    phoneNumber: '695624408'
  }
  try {
    const response = await fetch('/api/auth/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockData)
    })

    if (!response.ok) {
      throw new Error('Failed to update user data')
    }
  } catch (error) {
    console.error('Error updating user data:', error)
    throw error
  }
}