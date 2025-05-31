import { create } from 'zustand';

import {
  RechargeListContentType,
  RechargePageType,
} from '@/types/recharges';

interface RechargeState {
    recharges: RechargeListContentType[];
    currentRecharge: RechargeListContentType | null;
    pagination: Omit<RechargePageType, 'content'> | null;
    isLoading: boolean;
    error: string | null;
    setRecharges: (data: RechargePageType) => void;
    setCurrentRecharge: (recharge: RechargeListContentType | null) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useRechargeStore = create<RechargeState>((set) => ({
    recharges: [],
    currentRecharge: null,
    pagination: null,
    isLoading: false,
    error: null,
    setRecharges: (data) => set({ 
        recharges: data.content,
        pagination: {
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageable: data.pageable,
            numberOfElements: data.numberOfElements,
            first: data.first,
            last: data.last,
            sort: data.sort,
            number: data.number,
            size: data.size,
            empty: data.empty
        }
    }),
    setCurrentRecharge: (recharge) => set({ currentRecharge: recharge }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
}));