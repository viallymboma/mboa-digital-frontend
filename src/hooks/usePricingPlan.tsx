import useSWR from 'swr';

import { PricingPlanService } from '@/services/pricing.service';
import { usePricingPlanStore } from '@/stores/pricing.store';
import { PricingPlanType } from '@/types/pricing';

// import useSWRMutation from 'swr/mutation';
// import { notify } from '@/components/utilities/helper';
// import { PricingPlanService } from '@/services/pricingPlan.service';
// import { usePricingPlanStore } from '@/stores/pricingPlan.store';
// import { PricingPlanType } from '@/types/pricingPlan';

// async function fetchPricingPlansFetcher(url: string) {
//     const apiService = PricingPlanService.getInstance();
//     return apiService.getAllPlans();
// }

// async function fetchActivePlansFetcher(url: string) {
//     const apiService = PricingPlanService.getInstance();
//     return apiService.getActivePlans();
// }

export type PlanInfoType = {
    name: string;
    description: string;
    minSMS: number;
    maxSMS: number;
    unitPrice: number;
    validity: number;
    total?: number;
}

export type PlanDetailsType = {
    plan: PricingPlanType | null;
    planInfo: PlanInfoType | null;
};

export function usePricingPlan() {
    const { 
        setPlans, 
        setActivePlansStore,
        // plans,
        // activePlansStore 
    } = usePricingPlanStore();

    // GET ALL PLANS MUTATION
    const { data: allPlans, error: allPlansError, isLoading: isLoadingAll, mutate: mutateAllPlans } = useSWR(
        'pricing-plans',
        async () => {
            const service = PricingPlanService.getInstance();
            const plans = await service.getAllPlans();
            setPlans(plans);
            return plans;
        }
    );

    // console.log(allPlans, "Fetched all plans data");

    // GET ACTIVE PLANS MUTATION
    const { data: activePlans, error: activeError, isLoading: isLoadingActive, mutate: mutateActivePlans } = useSWR(
        'active-pricing-plans',
        async () => {
            const service = PricingPlanService.getInstance();
            const plans = await service.getActivePlans();
            setActivePlansStore(plans);
            return plans;
        }
    );

    const calculatePrice = (qteMessage: number): { price: number; plan: PricingPlanType | null } => {
        if (!activePlans?.length) return { price: 0, plan: null };

        const applicablePlan = activePlans.find(
            (plan: PricingPlanType) => qteMessage >= plan.minSMS && qteMessage <= plan.maxSMS
        );

        if (!applicablePlan) return { price: 0, plan: null };

        return {
            price: qteMessage * applicablePlan.smsUnitPrice,
            plan: applicablePlan
        };
    };

    const refetchPlans = async () => {
        await Promise.all([
            mutateAllPlans(),
            mutateActivePlans()
        ]);
    };

    const getApplicablePlan = (qteMessage: number): PlanDetailsType => {
        if (!activePlans?.length) return { plan: null, planInfo: null };

        const applicablePlan = activePlans.find(
            (plan: PricingPlanType) => qteMessage >= plan.minSMS && qteMessage <= plan.maxSMS
        );

        if (!applicablePlan) return { plan: null, planInfo: null };

        return {
            plan: applicablePlan,
            planInfo: {
                name: applicablePlan.planNameFr,
                description: applicablePlan.descriptionFr,
                minSMS: applicablePlan.minSMS,
                maxSMS: applicablePlan.maxSMS,
                unitPrice: applicablePlan.smsUnitPrice,
                validity: applicablePlan.nbDaysToExpired,
                total: qteMessage * applicablePlan.smsUnitPrice
            }
        };
    };

    return {
        plans: allPlans,
        activePlans: activePlans,
        isLoading: isLoadingAll || isLoadingActive,
        error: allPlansError || activeError,
        calculatePrice,
        refetchPlans,
        getApplicablePlan
    };
}
