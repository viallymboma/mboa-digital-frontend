import { create } from 'zustand';

import { PricingPlanType } from '@/types/pricing';

// import { PricingPlanType } from '@/types/pricingPlan';

interface PricingPlanState {
    plans: PricingPlanType[];
    activePlansStore: PricingPlanType[];
    currentPlan: PricingPlanType | null;
    isLoading: boolean;
    error: string | null;
    setPlans: (plans: PricingPlanType[]) => void;
    setActivePlansStore: (plans: PricingPlanType[]) => void;
    setCurrentPlan: (plan: PricingPlanType | null) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const usePricingPlanStore = create<PricingPlanState>((set) => ({
    plans: [],
    activePlansStore: [],
    currentPlan: null,
    isLoading: false,
    error: null,
    setPlans: (plans) => set({ plans }),
    setActivePlansStore: (plans) => set({ activePlansStore: plans }),
    setCurrentPlan: (plan) => set({ currentPlan: plan }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
}));