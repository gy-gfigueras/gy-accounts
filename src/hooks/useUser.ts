/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User, UserUpdateData } from '../domain/user';
import { getUser, updateUser } from '../services/user';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { updateApiKey } from '../services/user';

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
  refreshApiKey: () => void;
  isUpdatingAPIKEY: boolean;
  isErrorUpdateAPIKEY: boolean;
  isUpdatedAPIKEY: boolean;
  setIsUpdatedAPIKEY: (value: boolean) => void;
  setIsErrorUpdateAPIKEY: (value: boolean) => void;
}

export function useUser(): useUserProps {
  const { data, isLoading, error } = useSWR('/api/auth/get', getUser);
  const [isErrorUpdate, setIsErrorUpdate] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isUpdatingAPIKEY, setIsUpdatingAPIKEY] = useState(false);
  const [isErrorUpdateAPIKEY, setIsErrorUpdateAPIKEY] = useState(false);
  const [isUpdatedAPIKEY, setIsUpdatedAPIKEY] = useState(false);

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

  const refreshApiKey = async () => {
    setIsUpdatingAPIKEY(true);
    try {
      await updateApiKey();
      await mutate('/api/auth/get', async () => await getUser(), {
        revalidate: true,
      });
      setIsErrorUpdateAPIKEY(false);
      setIsUpdatedAPIKEY(true);
    } catch (err) {
      console.error('Failed to update user:', err);
      setIsErrorUpdateAPIKEY(true);
      setIsUpdatedAPIKEY(false);
      throw err;
    } finally {
      setIsUpdatingAPIKEY(false);
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
    refreshApiKey,
    isErrorUpdateAPIKEY,
    isUpdatedAPIKEY,
    isUpdatingAPIKEY,
    setIsUpdatedAPIKEY,
    setIsErrorUpdateAPIKEY,
  };
}
