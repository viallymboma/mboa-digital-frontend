import { MessageHistoryType } from '@/types/history';

import { ApiService } from './data.service';

export class HistoryService {
  private static instance: HistoryService;
  private apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): HistoryService {
    if (!HistoryService.instance) {
      HistoryService.instance = new HistoryService();
    }
    return HistoryService.instance;
  }

  async getMessageHistory(enterpriseId: string): Promise<MessageHistoryType[]> {
    try {
      return await this.apiService.get<MessageHistoryType[]>(`/api/v1/message/${enterpriseId}/all`);
    } catch (error) {
      console.error('Failed to fetch message history:', error);
      throw new Error('Unable to retrieve message history');
    }
  }
}