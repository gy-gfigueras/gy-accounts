import type {User} from "../types/user" 
import {getUser} from "../service/user"
import useSWR from "swr"

interface useGYUser{
    data: User 
    isLoading: boolean
    error: any
}

export function useGycodingUser(){
    const {
        data,
        isLoading,
        error
        } = useSWR('/api/auth/get', getUser);
    return {
        data,
        isLoading,
        error
        } as useGYUser
}