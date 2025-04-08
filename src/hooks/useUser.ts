/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User, UserUpdateData } from '../domain/user';
import { getUser, updateUser } from '../services/user';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';

interface useUserProps {
  data: User | undefined;
  isLoading: boolean;
  error: Error | null;
  update: (data: UserUpdateData) => Promise<void>;
  isLoadingUpdate: boolean;
  isErrorUpdate: boolean;
  isUpdated: boolean;
  setIsUpdated: (value: boolean) => void;
  setIsErrorUpdate: (value: boolean) => void;
}

export function useUser(): useUserProps {
  const { data, isLoading, error } = useSWR('/api/auth/get', getUser);
  const [isErrorUpdate, setIsErrorUpdate] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const update = async (updateData: UserUpdateData) => {
    setIsLoadingUpdate(true);
    try {
      await updateUser(updateData);
      await mutate('/api/auth/get', async () => await getUser(), {
        revalidate: true,
      });
      setIsUpdated(true);
      setIsErrorUpdate(false);
    } catch (err) {
      console.error('Failed to update user:', err);
      setIsErrorUpdate(true);
      setIsUpdated(false);
      throw err;
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    update,
    isLoadingUpdate,
    isErrorUpdate,
    setIsErrorUpdate,
    isUpdated,
    setIsUpdated,
  };
}
