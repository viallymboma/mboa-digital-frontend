'use client';
import useSWR from 'swr';

import { RechargeListContentType } from '@/types/recharges';

import { useContacts } from './useContacts';
import { useRecharges } from './useRecharges';

type DashboardStats = {
    sentSMS: { value: number; trend: string };
    smsCredits: { value: number; trend: string };
    totalContacts: { value: number; trend: string };
    totalRecharges: { value: number; trend: string };
};

export const useDashboardStats = () => {
    const { recharges } = useRecharges();
    const { contacts } = useContacts(); 
    const calculateStats = (): DashboardStats | null => {
        if (!recharges || !contacts) return null;

        // Calculate total recharges (non-archived)
        const activeRecharges = recharges.filter(r => !r.archived);
        const totalRecharges = activeRecharges.length;

        // Calculate total SMS credits and amount spent
        const smsStats = activeRecharges.reduce((acc, recharge: RechargeListContentType) => {
            acc.totalCredits += recharge.qteMessage;
            acc.totalSpent += recharge.qteMessage * recharge.messagePriceUnit;
            return acc;
        }, { totalCredits: 0, totalSpent: 0, sentSMS: 0 });

        // Calculate trends based on last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentRecharges = recharges.filter(r => 
            new Date(r.createdAt) > thirtyDaysAgo && !r.archived
        );

        const previousRecharges = recharges.filter(r => 
            new Date(r.createdAt) <= thirtyDaysAgo && 
            new Date(r.createdAt) > new Date(thirtyDaysAgo.getTime() - 30 * 24 * 60 * 60 * 1000) &&
            !r.archived
        );

        // Calculate trend percentages
        const rechargeTrend = previousRecharges.length > 0
            ? ((recentRecharges.length - previousRecharges.length) / previousRecharges.length * 100).toFixed(1)
            : '0';

        // Get enterprise SMS credit from the latest recharge's enterprise
        const latestRecharge = activeRecharges[0];
        const currentSMSCredit = latestRecharge?.enterprise?.smsCredit || 0;

        return {
            sentSMS: {
                value: smsStats.totalCredits - currentSMSCredit,
                trend: '+5.2%' // This should be calculated based on historical data
            },
            smsCredits: {
                value: currentSMSCredit,
                trend: `${rechargeTrend}%`
            },
            totalContacts: {
                value: contacts?.length,
                trend: '+12.5%' // This should be calculated based on historical data
            },
            totalRecharges: {
                value: totalRecharges,
                trend: `${Number(rechargeTrend) > 0 ? '+' : ''}${rechargeTrend}%`
            }
        };
    };

    return useSWR<DashboardStats | null>(
        'dashboard-stats',
        calculateStats,
        {
            refreshInterval: 30000, // Refresh every 30 seconds
            revalidateOnFocus: true
        }
    );
};