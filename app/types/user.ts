export type UserRole = 'ADMIN' | 'COMMON'

export interface User {
  username: string
  email: string
  picture: string
  roles: UserRole[]
  phoneNumber: string | null
}

export interface UserUpdateData {
  username: string
  email: string
  picture: string
  phoneNumber: string | null
}
