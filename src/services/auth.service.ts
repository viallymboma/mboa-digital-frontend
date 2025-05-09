// import { ApiService } from './api.service';

import { ApiService } from './data.service';

export interface LoginRequest {
    email: string;
    password: string;
}

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

export class AuthService {
    private api: ApiService;

    constructor() {
        this.api = ApiService.getInstance();
    }

    async login(data: LoginRequest): Promise<AuthResponse> {
        return this.api.post<AuthResponse>('/auth/login', data as unknown as Record<string, unknown>);
    }

    async signup(data: SignUpRequest): Promise<AuthResponse> {
        return this.api.post<AuthResponse>('/auth/signup', data as unknown as Record<string, unknown>);
    }

    async logout(): Promise<void> {
        localStorage.clear();
        window.location.href = '/login';
    }
}