import {
  EnterpriseContactDTO,
  EnterpriseContactResponseType,
} from '@/types/contact';

import { ApiService } from './data.service';

export class ContactService {
    private static instance: ContactService;
    private apiService: ApiService;

    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): ContactService {
        if (!ContactService.instance) {
            ContactService.instance = new ContactService();
        }
        return ContactService.instance;
    }

    async getContacts(): Promise<EnterpriseContactResponseType[]> {
        return this.apiService.get<EnterpriseContactResponseType[]>('/api/v1/contact');
    }

    async createContact(contact: EnterpriseContactDTO): Promise<EnterpriseContactResponseType> {
        return this.apiService.post<EnterpriseContactResponseType>('/api/v1/contact', contact);
    }

    async deleteContacts(contactIds: string[]): Promise<void> {
        return this.apiService.post('/api/v1/contacts/delete', { contactIds });
    }

    async sendMessage(contactIds: string[], message: string): Promise<void> {
        return this.apiService.post('/api/v1/contacts/message', { contactIds, message });
    }
}