import {
  GetMessageResponseType,
  SendMessageRequestType,
  SendMessageResponseType,
} from '@/types/messages';

import { ApiService } from './data.service';

// import { SendMessageRequestType, SendMessageResponseType } from '@/types/message';

export class MessageService {
    private static instance: MessageService;
    private apiService: ApiService;

    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): MessageService {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }

    async sendMessage(data: SendMessageRequestType) {
        return this.apiService.post<SendMessageResponseType, SendMessageRequestType>(
            '/api/v1/message/sendMessage',
            data
        );
    }

    async getMessages(enterpriseId: string, page: number, size: number) {
        return this.apiService.get<GetMessageResponseType>(
            `/api/v1/message/${enterpriseId}/all`,
            { page, size }
        );
    }

    async getAllMessages(enterpriseId: string, page: number, size: number) {
        return this.apiService.get<GetMessageResponseType>(
            `/api/v1/message/${enterpriseId}/all`,
            { page, size }
        );
    }
}