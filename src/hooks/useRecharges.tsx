"use client";
import { useCallback } from 'react';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { notify } from '@/components/utilities/helper';
import { RechargeService } from '@/services/recharge.service';
import { useRechargeStore } from '@/stores/recharges.store';
import {
  CreateRechargeRequestType,
  RechargeListContentType,
  UpdateRechargeRequestType,
} from '@/types/recharges';
import {
  ADMIN_ROLE,
  ADMIN_USER_ROLE,
  USER_ROLE,
} from '@/utils/constants';

import useGetLocalStorage from './useGetLocalStorage';

// Fetcher functions
async function createRechargeFetcher(url: string, { arg }: { arg: CreateRechargeRequestType }) {
    const service = RechargeService.getInstance();
    return service.createRecharge(arg);
}

async function updateRechargeFetcher(url: string, { arg }: { arg: { id: string; data: UpdateRechargeRequestType } }) {
    const service = RechargeService.getInstance();
    return service.updateRecharge(arg.id, arg.data);
}

async function validateRechargeFetcher(url: string, { arg }: { arg: string }) {
    const service = RechargeService.getInstance();
    return service.validateRecharge(arg);
}

async function refuseRechargeFetcher(url: string, { arg }: { arg: string }) {
    const service = RechargeService.getInstance();
    return service.refuseRecharge(arg);
}

async function creditAccountFetcher(url: string, { arg }: { arg: { enterpriseId: string; qteMessage: number } }) {
    const service = RechargeService.getInstance();
    return service.creditAccount(arg.enterpriseId, { qteMessage: arg.qteMessage });
}

export function useRecharges() {
    const { getLocalStorage } = useGetLocalStorage(); 
    // const { setRecharges  } = useRechargeStore();
    const { 
        setRecharges,
        // setIsLoading,
        // setError 
    } = useRechargeStore();

    // // Main recharges fetch
    // const { data, error, isLoading, mutate } = useSWR<RechargeListContentType[]>(
    //     'recharges',
    //     async () => {
    //         const service = RechargeService.getInstance();
    //         const response = await service.getAllRecharges();
    //         console.log('Fetched recharges in hoooook:', response);
    //         setRecharges(response);
    //         return response.content || [];
    //     }
    // );
    // Main recharges fetch
    const { data, error, isLoading, mutate } = useSWR<RechargeListContentType[]>(
        `${ getLocalStorage("user")?.role === ADMIN_ROLE ? "/api/v1/recharge/all" : `/api/v1/recharge/${ getLocalStorage("user")?.enterprise?.id }/all` }`,
        async () => {
            const service = RechargeService.getInstance();
            const user = getLocalStorage("user");
            // console.log('User in useRecharges hook:', user);
            const userRole = user?.role || USER_ROLE; // Default to 'USER' if not found
            const enterpriseId = user?.enterprise?.id;

            let response;

            // Check user role and call appropriate endpoint
            if (userRole === ADMIN_ROLE) {
                response = await service.getAllRecharges();
                console.log('Fetched all recharges in useRecharges hook:', response);
            } else if (userRole === ADMIN_USER_ROLE) {
                if (!enterpriseId) {
                    throw new Error('Enterprise ID not found');
                }
                response = await service.getRecharges(enterpriseId);
            } else {
                throw new Error('Invalid user role');
            }

            setRecharges(response);
            return response.content || response || [];
        }
    );

    // Create recharge mutation
    const { trigger: createRechargeTrigger } = useSWRMutation(
        '/api/v1/recharge',
        createRechargeFetcher,
        {
            onSuccess: () => {
                notify.success('Recharge created successfully');
                mutate(); // Refresh recharges list
            },
            onError: (error: unknown) => {
                let message = 'Failed to fetch recharges';
                if (
                    error &&
                    typeof error === 'object' &&
                    'response' in error &&
                    (error as { response?: unknown }).response &&
                    typeof (error as { response?: unknown }).response === 'object' &&
                    'data' in (error as { response: { data?: unknown } }).response &&
                    (error as { response: { data?: unknown } }).response.data &&
                    typeof (error as { response: { data?: unknown } }).response.data === 'object' &&
                    'message' in (error as { response: { data: { message?: string } } }).response.data
                ) {
                    // @ts-expect-error: dynamic error shape
                    message = error.response.data.message || message;
                }
                notify.error(message);
            }
        }
    );

    // Update recharge mutation
    const { trigger: updateRechargeTrigger } = useSWRMutation(
        '/api/v1/recharge/update',
        updateRechargeFetcher,
        {
            onSuccess: () => {
                notify.success('Recharge updated successfully');
                mutate();
            },
            onError: (error: unknown) => {
                let message = 'Failed to fetch recharges';
                if (
                    error &&
                    typeof error === 'object' &&
                    'response' in error &&
                    (error as { response?: unknown }).response &&
                    typeof (error as { response?: unknown }).response === 'object' &&
                    'data' in (error as { response: { data?: unknown } }).response &&
                    (error as { response: { data?: unknown } }).response.data &&
                    typeof (error as { response: { data?: unknown } }).response.data === 'object' &&
                    'message' in (error as { response: { data: { message?: string } } }).response.data
                ) {
                    // @ts-expect-error: dynamic error shape
                    message = error.response.data.message || message;
                }
                notify.error(message);
            }
        }
    );

    // Validate recharge mutation
    const { trigger: validateRechargeTrigger } = useSWRMutation(
        '/api/v1/recharge/validate',
        validateRechargeFetcher,
        {
            onSuccess: () => {
                notify.success('Recharge validated successfully');
                mutate();
            },
            onError: (error: unknown) => {
                let message = 'Failed to fetch recharges';
                if (
                    error &&
                    typeof error === 'object' &&
                    'response' in error &&
                    (error as { response?: unknown }).response &&
                    typeof (error as { response?: unknown }).response === 'object' &&
                    'data' in (error as { response: { data?: unknown } }).response &&
                    (error as { response: { data?: unknown } }).response.data &&
                    typeof (error as { response: { data?: unknown } }).response.data === 'object' &&
                    'message' in (error as { response: { data: { message?: string } } }).response.data
                ) {
                    // @ts-expect-error: dynamic error shape
                    message = error.response.data.message || message;
                }
                notify.error(message);
            }
        }
    );

    // Refuse recharge mutation
    const { trigger: refuseRechargeTrigger } = useSWRMutation(
        '/api/v1/recharge/refused',
        refuseRechargeFetcher,
        {
            onSuccess: () => {
                notify.success('Recharge refused successfully');
                mutate();
            },
            onError: (error: unknown) => {
                let message = 'Failed to fetch recharges';
                if (
                    error &&
                    typeof error === 'object' &&
                    'response' in error &&
                    (error as { response?: unknown }).response &&
                    typeof (error as { response?: unknown }).response === 'object' &&
                    'data' in (error as { response: { data?: unknown } }).response &&
                    (error as { response: { data?: unknown } }).response.data &&
                    typeof (error as { response: { data?: unknown } }).response.data === 'object' &&
                    'message' in (error as { response: { data: { message?: string } } }).response.data
                ) {
                    // @ts-expect-error: dynamic error shape
                    message = error.response.data.message || message;
                }
                notify.error(message);
            }
        }
    );

    // Credit account mutation
    const { trigger: creditAccountTrigger } = useSWRMutation(
        '/api/v1/recharge/creditercompte',
        creditAccountFetcher,
        {
            onSuccess: () => {
                notify.success('Account credited successfully');
                mutate();
            },
            onError: (error: unknown) => {
                let message = 'Failed to fetch recharges';
                if (
                    error &&
                    typeof error === 'object' &&
                    'response' in error &&
                    (error as { response?: unknown }).response &&
                    typeof (error as { response?: unknown }).response === 'object' &&
                    'data' in (error as { response: { data?: unknown } }).response &&
                    (error as { response: { data?: unknown } }).response.data &&
                    typeof (error as { response: { data?: unknown } }).response.data === 'object' &&
                    'message' in (error as { response: { data: { message?: string } } }).response.data
                ) {
                    // @ts-expect-error: dynamic error shape
                    message = error.response.data.message || message;
                }
                notify.error(message);
            }
        }
    );

    // Wrapper functions
    const createRecharge = useCallback(async (data: Omit<CreateRechargeRequestType, 'enterpriseId'>) => {
        const rechargeData = {
            ...data,
            enterpriseId: getLocalStorage("user")?.enterprise?.id
        };
        return createRechargeTrigger(rechargeData);
    }, [createRechargeTrigger]);

    const updateRecharge = useCallback(async (
        rechargeId: string, 
        data: Omit<UpdateRechargeRequestType, 'enterpriseId'>
    ) => {
        const rechargeData = {
            ...data,
            enterpriseId: getLocalStorage("user")?.enterprise?.id
        };
        return updateRechargeTrigger({ id: rechargeId, data: rechargeData });
    }, [updateRechargeTrigger]);

    const validateRecharge = useCallback(async (rechargeId: string) => {
        return validateRechargeTrigger(rechargeId);
    }, [validateRechargeTrigger]);

    const refuseRecharge = useCallback(async (rechargeId: string) => {
        return refuseRechargeTrigger(rechargeId);
    }, [refuseRechargeTrigger]);

    const creditAccount = useCallback(async (qteMessage: number) => {
        const enterpriseId = getLocalStorage("user")?.enterprise?.id;
        return creditAccountTrigger({ enterpriseId, qteMessage });
    }, [creditAccountTrigger]);

    // console.log("Recharges data in useRecharges hook +++++:", data);

    return {
        recharges: data || [], 
        error,
        isLoading,
        createRecharge,
        updateRecharge,
        validateRecharge,
        refuseRecharge,
        creditAccount,
        refetchRecharges: mutate
    };
}
