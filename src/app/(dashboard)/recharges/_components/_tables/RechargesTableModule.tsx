import React from 'react';

import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
import {
  PendingRechargesSvgIcon,
  PerformedRechargesSvgIcon,
  ValidatedRechargesSvgIcon,
} from '@/app/svg_components/SvgIcons';

import RechargesTable from './RechargesTable';

const RechargesTableModule = () => {
  return (
    <div className=' w-[100%]'>

      <div className='flex items-center gap-4 py-4'>
        <StatsCard
          value="10k"
          label="Recharges effectuées"
          icon={<PerformedRechargesSvgIcon />}
          color="black"
          borderColor="border-primaryAppearance"
          trend={{ value: '+ 5.5%', isPositive: true }}
        />
        <StatsCard
          value="3.7k"
          label="Recharges validées"
          icon={<ValidatedRechargesSvgIcon />}
          color="#0E8345"
          borderColor="border-borderGreen"
        />
        <StatsCard
          value="90"
          label="Recharges en attente"
          icon={<PendingRechargesSvgIcon />}
          color="#F6BC2F"
          borderColor="border-pendingYelloW"
        />
      </div>

      <RechargesTable />

    </div>
  )
}

export default RechargesTableModule