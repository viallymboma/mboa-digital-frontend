// import { ApiService } from './api.service';
// import { PricingPlanResponseType, PricingPlanType } from '@/types/pricingPlan';

import {
  PricingPlanResponseType,
  PricingPlanType,
} from '@/types/pricing';

import { ApiService } from './data.service';

export class PricingPlanService {
    private static instance: PricingPlanService;
    private apiService: ApiService;

    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): PricingPlanService {
        if (!PricingPlanService.instance) {
            PricingPlanService.instance = new PricingPlanService();
        }
        return PricingPlanService.instance;
    }

    async getAllPlans(): Promise<PricingPlanResponseType> {
        return this.apiService.get<PricingPlanResponseType>('/api/v1/PricingPlan');
    }

    async getActivePlans(): Promise<PricingPlanResponseType> {
        return this.apiService.get<PricingPlanResponseType>('/api/v1/PricingPlan/actives');
    }

    async getPlanById(id: string): Promise<PricingPlanType> {
        return this.apiService.get<PricingPlanType>(`/api/v1/PricingPlan/${id}`);
    }
}