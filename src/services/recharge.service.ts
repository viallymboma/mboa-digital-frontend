// import { ApiService } from './api.service';
import {
  CreateRechargeRequestType,
  CreateRechargeTypeResponse,
  CreditAccountRequestType,
  CreditAccountResponseType,
  RechargeListContentType,
  RechargePageType,
  UpdateRechargeRequestType,
} from '@/types/recharges';

import { ApiService } from './data.service';

export class RechargeService {
    private static instance: RechargeService;
    private apiService: ApiService;

    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): RechargeService {
        if (!RechargeService.instance) {
            RechargeService.instance = new RechargeService();
        }
        return RechargeService.instance;
    }

    /**
     * Create a new recharge
     */
    async createRecharge(data: CreateRechargeRequestType): Promise<CreateRechargeTypeResponse> {
        return this.apiService.post<CreateRechargeTypeResponse>('/api/v1/recharge/create-request', data);
    }

    // /**
    //  * Get paginated list of recharges
    //  */
    // async getRecharges(page: number = 0, size: number = 10): Promise<RechargePageType> {
    //     return this.apiService.get<RechargePageType>(`/api/v1/recharge?page=${page}&size=${size}`);
    // }

    /**
     * Get paginated list of recharges
     */
    async getRecharges(enterpriseId: string): Promise<RechargePageType> {
        return this.apiService.get<RechargePageType>(`/api/v1/recharge/${ enterpriseId }/all`);
        // /api/v1/recharge/{enterpriseId}/enterprise
    }

    /**
     * Get paginated list of recharges
     */
    async getAllRecharges(): Promise<RechargePageType> {
        return this.apiService.get<RechargePageType>(`/api/v1/recharge/all`);
    }

    /**
     * Get a single recharge by ID
     */
    async getRecharge(id: string): Promise<RechargeListContentType> {
        return this.apiService.get<RechargeListContentType>(`/api/v1/recharge/${id}`);
    }

    /**
     * Update an existing recharge
     */
    async updateRecharge(rechargeId: string, data: UpdateRechargeRequestType): Promise<RechargeListContentType> {
        return this.apiService.put<RechargeListContentType>(`/api/v1/recharge/${rechargeId}/update`, data);
    }

    /**
     * Validate a recharge
     */
    async validateRecharge(rechargeId: string): Promise<RechargeListContentType> {
        return this.apiService.put<RechargeListContentType>(`/api/v1/recharge/${rechargeId}/validate`, {});
    }

    /**
     * Refuse a recharge
     */
    async refuseRecharge(rechargeId: string): Promise<RechargeListContentType> {
        return this.apiService.put<RechargeListContentType>(`/api/v1/recharge/${rechargeId}/refused`, {});
    }

    /**
     * Credit an enterprise account with messages
     */
    async creditAccount(enterpriseId: string, data: CreditAccountRequestType): Promise<CreditAccountResponseType> {
        return this.apiService.put<CreditAccountResponseType>(
            `/api/v1/recharge/${enterpriseId}/creditercompte`,
            data
        );
    }

    /**
     * Utility method to transform API response to local format if needed
     */
    private transformRechargeResponse(response: RechargeListContentType): RechargeListContentType {
        return {
            ...response,
            enterprise: response.enterprise || {},
            paymentMethod: response.paymentMethod || 'CASH',
            archived: response.archived || false
        };
    }
}











// // import { ApiService } from './api.service';
// import { CreateRechargeRequestType, CreditAccountResponseType, ReachargePageableType, RechargeListContentType, RechargePageType, UpdateRechargeRequestType } from '@/types/recharges';
// import { ApiService } from './data.service';

// export class RechargeService {
//     private static instance: RechargeService;
//     private apiService: ApiService;

//     private constructor() {
//         this.apiService = ApiService.getInstance();
//     }

//     public static getInstance(): RechargeService {
//         if (!RechargeService.instance) {
//             RechargeService.instance = new RechargeService();
//         }
//         return RechargeService.instance;
//     }

//     async createRecharge(data: CreateRechargeRequestType): Promise<CreateRechargeRequestType> {
//         return this.apiService.post<CreateRechargeRequestType>('/api/v1/recharge', data);
//     }

//     async getRecharges(page: number = 0, size: number = 10): Promise<RechargePageType> {
//         return this.apiService.get<RechargePageType>(`/api/v1/recharge?page=${page}&size=${size}`);
//     }

//     async getRecharge(id: string): Promise<RechargeListContentType> {
//         return this.apiService.get<RechargeListContentType>(`/api/v1/recharge/${id}`);
//     }

//     async updateRecharge(rechargeId: string, data: UpdateRechargeRequestType): Promise<UpdateRechargeRequestType> {
//         return this.apiService.put<UpdateRechargeRequestType>(`/api/v1/recharge/${rechargeId}/update`, data);
//     }

//     async validateRecharge(rechargeId: string): Promise<RechargeListContentType> {
//         return this.apiService.put<RechargeListContentType>(`/api/v1/recharge/${rechargeId}/validate`, {});
//     }

//     async refuseRecharge(rechargeId: string): Promise<RechargeListContentType> {
//         return this.apiService.put<RechargeListContentType>(`/api/v1/recharge/${rechargeId}/refused`, {});
//     }

//     async creditAccount(enterpriseId: string, qteMessage: number): Promise<CreditAccountResponseType> {
//         return this.apiService.put<CreditAccountResponseType>(
//             `/api/v1/recharge/${enterpriseId}/creditercompte`,
//             { qteMessage }
//         );
//     }
// }