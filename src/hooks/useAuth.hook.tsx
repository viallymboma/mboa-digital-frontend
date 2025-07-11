"use client";
import React from 'react';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

// import { notify } from '@/components/utilities/helper';
import { ApiService } from '@/services/data.service';
import {
  LoginResponse,
  UserType,
} from '@/types/auth';

import useGetLocalStorage from './useGetLocalStorage';

export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

// export interface LoginResponse {
//     statusCode: 200,
//     error: null,
//     message: string,
//     id: string,
//     createdAt: string,
//     updatedAt: string,
//     version: number,
//     token: string,
//     refreshToken: string,
//     expirationTime: string,
//     firstname: string,
//     lastname: string,
//     email: string,
//     phoneNumber: string,
//     country: string,
//     city: string,
//     gender: string,
//     role: string,
//     archived: boolean
// }

async function signupFetcher(url: string, { arg }: { arg: SignUpRequest }) {
    const apiService = ApiService.getInstance();
    return apiService.post<AuthResponse, SignUpRequest>(url, arg);
}

export function useSignup() {
    const router = useRouter();

    const { trigger, isMutating, error } = useSWRMutation(
        '/api/v1/auth/register',
        signupFetcher,
        {
            onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                router.push('/login');
            },
            // onError: (error: unknown) => {
            //     let message = 'Failed to fetch recharges';
            //     if (
            //         error &&
            //         typeof error === 'object' &&
            //         'response' in error &&
            //         (error as { response?: unknown }).response &&
            //         typeof (error as { response?: unknown }).response === 'object' &&
            //         'data' in (error as { response: { data?: unknown } }).response &&
            //         (error as { response: { data?: unknown } }).response.data &&
            //         typeof (error as { response: { data?: unknown } }).response.data === 'object' &&
            //         'message' in (error as { response: { data: { message?: string } } }).response.data
            //     ) {
            //         // @ts-expect-error: dynamic error shape
            //         message = error.response.data.message || message;
            //     }
            //     notify.error(message);
            // }
        }
    );

    return {
        signup: trigger,
        isLoading: isMutating,
        error,
    };
}

async function loginFetcher(url: string, { arg }: { arg: LoginRequest }) {
    const apiService = ApiService.getInstance();
    return apiService.post<LoginResponse, LoginRequest>(url, arg);
}

export function useLogin() {
    // const router = useRouter();

    const { trigger, isMutating, error } = useSWRMutation(
        '/api/v1/auth/login',
        loginFetcher,
        {
            onSuccess: (data: LoginResponse) => {
                // Store both tokens
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                // Store user data if needed
                localStorage.setItem('user', JSON.stringify({
                    id: data.id,
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    role: data.role, 
                    enterprise: data.userEnterprise
                }));
                // Store expiration time
                const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
                localStorage.setItem('tokenExpiration', expirationTime.toString());
                // router.push('/dashboard');
            },
        }
    );

    const login = async (data: LoginRequest) => {
        try {
            await trigger(data);
        } catch (err) {
            console.error('Login failed:', err);
            throw err;
        }
    };

    return {
        login,
        isLoading: isMutating,
        error,
    };
}


export function useUser() {
    const { getLocalStorage } = useGetLocalStorage();
    const [token, setToken] = React.useState<string | null>(null);
    const [user, setUser] = React.useState<UserType>();

    // Move localStorage access to useEffect
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
            setUser(getLocalStorage("user"));
        }
    }, []);

    const { data, error, isLoading } = useSWR<AuthResponse>(
        token && user?.email ? `/api/v1/auth/${user.email}` : null,
        url => {
            const apiService = ApiService.getInstance();
            return apiService.get<AuthResponse>(url);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            onError: (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        localStorage.removeItem('refreshToken');
                        window.location.href = '/login';
                    }
                }
            }
        }
    );

    return {
        user: data?.user,
        userNow: getLocalStorage("user"),
        isLoading,
        error,
        isAuthenticated: !!data?.user
    };
}


export function useLogout() {
    const router = useRouter();

    const logout = () => {
        localStorage.clear();
        router.push('/login');
    };

    return { logout };
}