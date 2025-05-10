import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

import { LoginResponse } from '@/hooks/useAuth.hook';

export class ApiService {
    private static instance: ApiService;
    private axiosInstance: AxiosInstance; 
    // Add these new properties
    private isRefreshing = false;
    private refreshSubscribers: ((token: string) => void)[] = [];

    // List of public routes that don't need authentication
    private publicRoutes = [
        '/api/v1/auth/login',
        '/api/v1/auth/register',
    ];

    public async handleTokenRefresh() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            this.handleUnauthorized();
            return;
        }

        try {
            const response = await this.axiosInstance.post<LoginResponse>('/api/v1/auth/refresh', {
                refreshToken
            });
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            
            return response.data.token;
        } catch (error) {
            this.handleUnauthorized();
            throw error;
        }
    }
    
    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // Only add token for non-public routes
                if (!this.isPublicRoute(config.url)) {
                    const token = localStorage.getItem('token');
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        // Queue the request if refresh is in progress
                        return new Promise(resolve => {
                            this.refreshSubscribers.push((token: string) => {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                                resolve(this.axiosInstance(originalRequest));
                            });
                        });
                    }

                    this.isRefreshing = true;
                    originalRequest._retry = true;

                    try {
                        const newToken = await this.handleTokenRefresh();
                        // Notify subscribers with new token
                        if (newToken) {
                            this.refreshSubscribers.forEach(callback => callback(newToken));
                        }
                        this.refreshSubscribers = [];
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return this.axiosInstance(originalRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    private isPublicRoute(url: string | undefined): boolean {
        if (!url) return false;
        return this.publicRoutes.some(route => url.includes(route));
    }

    private handleUnauthorized(): void {
        // Clear local storage
        localStorage.clear();
        // Redirect to login page
        window.location.href = '/login';
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    // Generic request methods
    public async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, { params });
        return response.data;
    }

    public async post<T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data);
        return response.data;
    }

    public async put<T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data);
        return response.data;
    }

    public async delete<T>(url: string): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url);
        return response.data;
    }
}

















// import axios, {
//   AxiosError,
//   AxiosRequestConfig,
// } from 'axios';

// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export const fetcher = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
//     try {
//         const response = await axiosInstance({ url, ...config });
//         return response.data;
//     } catch (error) {
//         if ((error as AxiosError).response?.status === 401 || (error as AxiosError).response?.status === 403) {
//             localStorage.clear();
//             window.location.href = '/login';
//         }
//         throw error;
//     }
// };