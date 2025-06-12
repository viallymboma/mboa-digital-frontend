import {
  ClientResponseType,
  CreateClientRequestType,
  UpdateClientRequestType,
} from '@/types/client';

import { ApiService } from './data.service';

// import { ApiService } from './api.service';
// import { 
//     CreateClientRequestType, 
//     UpdateClientRequestType, 
//     ClientResponseType 
// } from '@/types/clients';

export class ClientService {
    private static instance: ClientService;
    private apiService: ApiService;

    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): ClientService {
        if (!ClientService.instance) {
            ClientService.instance = new ClientService();
        }
        return ClientService.instance;
    }

    async createClient(data: CreateClientRequestType): Promise<ClientResponseType> {
        return this.apiService.post<ClientResponseType, CreateClientRequestType>('/api/v1/auth/register', data);
    }

    async updateClient(id: string, data: UpdateClientRequestType): Promise<ClientResponseType> {
        return this.apiService.put<ClientResponseType, UpdateClientRequestType>(`/api/v1/auth/update-user/${id}`, data);
    }

    async getClients(enterpriseId: string): Promise<ClientResponseType[]> {
        return this.apiService.get<ClientResponseType[]>(`/api/v1/auth/all/${enterpriseId}`);
    }

    async getClient(id: string): Promise<ClientResponseType> {
        return this.apiService.get<ClientResponseType>(`/api/v1/auth/users/${id}`);
    }
}