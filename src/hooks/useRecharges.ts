import { useCallback } from 'react';

import { notify } from '@/components/utilities/helper';
import { RechargeService } from '@/services/recharge.service';
import { useRechargeStore } from '@/stores/recharges.store';
// import { useRechargeStore } from '@/stores/recharge.store';
import {
  CreateRechargeRequestType,
  UpdateRechargeRequestType,
} from '@/types/recharges';

import useGetLocalStorage from './useGetLocalStorage';

// import { getLocalStorage } from '@/lib/storage.lib';

export function useRecharges() {
    const { 
        recharges, 
        pagination,
        isLoading, 
        error,
        setRecharges,
        // setCurrentRecharge,
        setIsLoading,
        setError 
    } = useRechargeStore();

    const { getLocalStorage } = useGetLocalStorage();
    const createRecharge = useCallback(async (data: Omit<CreateRechargeRequestType, 'enterpriseId'>) => {
        try {
            setIsLoading(true);
            const service = RechargeService.getInstance();
            const rechargeData = {
                ...data,
                enterpriseId: getLocalStorage("user")?.enterprise?.id
            };
            const response = await service.createRecharge(rechargeData);
            notify.success('Recharge created successfully');
            return response;
        } catch (error: unknown) {
            let message = 'Failed to create recharge';
            if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                // @ts-expect-error: dynamic error shape
                message = error.response.data.message || message;
            }
            notify.error(message);
            setError(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading, setError]);

    const fetchRecharges = useCallback(async (page: number = 0, size: number = 10) => {
        try {
            setIsLoading(true);
            const service = RechargeService.getInstance();
            const response = await service.getRecharges(page, size);
            setRecharges(response);
        } catch (error: unknown) {
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
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [setRecharges, setIsLoading, setError]);

    const updateRecharge = useCallback(async (
        rechargeId: string, 
        data: Omit<UpdateRechargeRequestType, 'enterpriseId'>
    ) => {
        try {
            setIsLoading(true);
            const service = RechargeService.getInstance();
            const rechargeData = {
                ...data,
                enterpriseId: getLocalStorage("user")?.enterprise?.id
            };
            const response = await service.updateRecharge(rechargeId, rechargeData);
            notify.success('Recharge updated successfully');
            return response;
        } catch (error: unknown) {
            let message = 'Failed to update recharge';
            if (
                error &&
                typeof error === 'object' &&
                'response' in error &&
                error.response &&
                typeof error.response === 'object' &&
                'data' in error.response &&
                error.response.data &&
                typeof error.response.data === 'object' &&
                'message' in error.response.data
            ) {
                // @ts-expect-error: dynamic error shape
                message = error.response.data.message || message;
            }
            notify.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading]);

    const validateRecharge = useCallback(async (rechargeId: string) => {
        try {
            setIsLoading(true);
            const service = RechargeService.getInstance();
            const response = await service.validateRecharge(rechargeId);
            notify.success('Recharge validated successfully');
            return response;
        } catch (error: unknown) {
            let message = 'Failed to validate recharge';
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
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading]);

    const refuseRecharge = useCallback(async (rechargeId: string) => {
        try {
            setIsLoading(true);
            const service = RechargeService.getInstance();
            const response = await service.refuseRecharge(rechargeId);
            notify.success('Recharge refused successfully');
            return response;
        } catch (error: unknown) {
            let message = 'Failed to refuse recharge';
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
                notify.error(message);
                throw error;
            }
            notify.error(message);
        } finally {
            setIsLoading(false);
        }
        // try {
        //     setIsLoading(true);
        //     const service = RechargeService.getInstance();
        //     const enterpriseId = getLocalStorage("user")?.enterprise?.id;
        //     const response = await service.creditAccount(enterpriseId, qteMessage);
        //     notify.success('Account credited successfully');
        //     return response;
        // } catch (error: unknown) {
        //     let message = 'Failed to credit account';
        //     if (
        //         error &&
        //         typeof error === 'object' &&
        //         'response' in error &&
        //         (error as { response?: unknown }).response &&
        //         typeof (error as { response?: unknown }).response === 'object' &&
        //         'data' in (error as { response: { data?: unknown } }).response &&
        //         (error as { response: { data?: unknown } }).response.data &&
        //         typeof (error as { response: { data?: unknown } }).response.data === 'object' &&
        //         'message' in (error as { response: { data: { message?: string } } }).response.data
        //     ) {
        //         // @ts-expect-error: dynamic error shape
        //         message = error.response.data.message || message;
        //     }
        //     notify.error(message);
        //     throw error;
        // } finally {
        //     setIsLoading(false);
        // }
    }, [setIsLoading]);

    const creditAccount = useCallback(async (qteMessage: number) => {
        try {
            setIsLoading(true);
            const service = RechargeService.getInstance();
            const enterpriseId = getLocalStorage("user")?.enterprise?.id;
            const response = await service.creditAccount(enterpriseId, { qteMessage });
            notify.success('Account credited successfully');
            return response;
        } catch (error: unknown) {
            let message = 'Failed to credit account';
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
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading]);

    return {
        recharges,
        pagination,
        isLoading,
        error,
        createRecharge,
        updateRecharge,
        validateRecharge,
        refuseRecharge,
        creditAccount,
        fetchRecharges
    };
}