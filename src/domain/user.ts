import { ERole } from '@/utils/constants/roles.enum';

export interface User {
  username: string;
  email?: string;
  picture: string;
  apiKey: string;
  roles: ERole[];
  phoneNumber: string | null;
}

export interface UserUpdateData {
  username: string;
  picture: string;
  phoneNumber: string | null;
}

export interface EditData {
  username: string;
  picture: string;
  phoneNumber: string | null;
}
