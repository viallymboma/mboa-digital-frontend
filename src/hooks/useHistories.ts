'use client';
import { useMemo } from 'react';

import useSWR from 'swr';

import { notify } from '@/components/utilities/helper';
import { usePricingPlan } from '@/hooks/usePricingPlan';
import { HistoryService } from '@/services/history.service';
// import { HistoryService } from '@/services/HistoryService';
import {
  HistoriesType,
  MessageHistoryType,
} from '@/types/history';

import useGetLocalStorage from './useGetLocalStorage';

async function getMessageHistoryFetcher(_: string, { arg }: { arg: { enterpriseId: string } }) {
  const historyService = HistoryService.getInstance();
  return historyService.getMessageHistory(arg.enterpriseId);
}

export function useHistories() {
  const { getLocalStorage } = useGetLocalStorage();
  const { calculatePrice } = usePricingPlan();
  const user = getLocalStorage('user');
  const enterpriseId = user?.enterprise?.id || '';

  const { data, error, isLoading, mutate } = useSWR<MessageHistoryType[]>(
    enterpriseId ? `api/v1/message/${enterpriseId}/all` : null,
    () => getMessageHistoryFetcher(`api/v1/message/${enterpriseId}/all`, { arg: { enterpriseId } }),
    {
      onError: (err) => {
        console.error('Failed to fetch histories:', err);
        notify.error('Échec de la récupération de l’historique des messages');
      },
    }
  );

  const histories: HistoriesType[] = useMemo(() => {
    if (!data) return [];
    return data
      .filter((item) => !item.archived)
      .map((item) => {
        const { price } = calculatePrice(item.smsCount);
        return {
          id: item.id,
          content: item.message,
          receivers: [item.msisdn],
          date: new Date(item.createdAt).toLocaleString('fr-FR', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
          smsUsedCount: item.smsCount,
          cost: price,
          status: item.status === 'ACCEPTED' ? 'Delivered' : item.status,
        };
      });
  }, [data, calculatePrice]);

  return {
    histories,
    isLoading,
    error,
    mutate,
  };
}