import React, { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
import {
  FailedSMSSvgIcon,
  PendingRechargesSvgIcon,
  PerformedRechargesSvgIcon,
  ValidatedRechargesSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { useRecharges } from '@/hooks/useRecharges';
import {
  DEMANDE,
  REFUSE,
  VALIDE,
} from '@/utils/constants';

import RechargesTable from './RechargesTable';

const RechargesTableModule = () => {
  const t = useTranslations('recharges');
  const { recharges } = useRecharges();

  const stats = useMemo(() => {
    if (!recharges?.length) return {
      total: 0,
      validated: 0,
      pending: 0, 
      rejected: 0,
    };

    return recharges.reduce((acc, recharge) => {
      acc.total += 1;
      if (!recharge.archived) {
        if (recharge.status === VALIDE) {
          acc.validated += 1;
        } else if (recharge.status === DEMANDE) {
          acc.pending += 1;
        } else if (recharge.status === REFUSE) {
          console.log('recharge', recharge);
          acc.rejected += 1;
          console.log('recharge', acc.rejected);
        }
      }
      return acc;
    }, {
      total: 0,
      validated: 0,
      pending: 0, 
      rejected: 0,
    });
  }, [recharges]);

  const trend = useMemo(() => {
    return {
      value: '0%',
      isPositive: stats.total > 0
    };
  }, [stats.total]);

  return (
    <div className='w-[100%]'>
      <div className='flex items-center gap-4 py-4'>
        <StatsCard
          value={stats.total.toLocaleString()}
          label={t('table.totalRecharges')}
          icon={<PerformedRechargesSvgIcon />}
          color="black"
          borderColor="border-primaryAppearance"
          trend={trend}
        />
        <StatsCard
          value={stats.validated.toLocaleString()}
          label={t('table.validatedRecharges')}
          icon={<ValidatedRechargesSvgIcon />}
          color="#0E8345"
          borderColor="border-borderGreen"
        />
        <StatsCard
          value={stats.pending.toLocaleString()}
          label={t('table.pendingRecharges')}
          icon={<PendingRechargesSvgIcon />}
          color="#F6BC2F"
          borderColor="border-pendingYelloW"
        />
        <StatsCard
          value={stats.rejected.toLocaleString()}
          label={t('table.rejectedRecharges')}
          icon={<FailedSMSSvgIcon />}
          color="#FF0000"
          borderColor="border-borderRed"
        />
      </div>

      <RechargesTable recharges={recharges} />
    </div>
  );
};

export default RechargesTableModule;
