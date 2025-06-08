import React, { useMemo } from 'react';

import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
import {
  FailedSMSSvgIcon,
  PendingRechargesSvgIcon,
  PerformedRechargesSvgIcon,
  ValidatedRechargesSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { useRecharges } from '@/hooks/useRecharges';

import RechargesTable from './RechargesTable';

const RechargesTableModule = () => {
  const { recharges } = useRecharges();

  const stats = useMemo(() => {
    if (!recharges?.length) return {
      total: 0,
      validated: 0,
      pending: 0, 
      rejected: 0,
    };

    return recharges.reduce((acc, recharge) => {
      // Count total recharges
      acc.total += 1;

      // Count based on status
      if (!recharge.archived) {
        if (recharge.status === 'VALIDE') {
          acc.validated += 1;
        } else if (recharge.status === 'DEMANDE') {
          acc.pending += 1;
        } else if (recharge.status === 'REFUSE') {
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

  // Calculate trend (assuming we have previous period data)
  const trend = useMemo(() => {
    // This is a placeholder - you would need to implement actual trend calculation
    // based on previous period data
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
          label="Recharges effectuées"
          icon={<PerformedRechargesSvgIcon />}
          color="black"
          borderColor="border-primaryAppearance"
          trend={trend}
        />
        <StatsCard
          value={stats.validated.toLocaleString()}
          label="Recharges validées"
          icon={<ValidatedRechargesSvgIcon />}
          color="#0E8345"
          borderColor="border-borderGreen"
        />
        <StatsCard
          value={stats.pending.toLocaleString()}
          label="Recharges en attente"
          icon={<PendingRechargesSvgIcon />}
          color="#F6BC2F"
          borderColor="border-pendingYelloW"
        />
        <StatsCard
          value={stats.rejected.toLocaleString()}
          label="Recharges rejetée"
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

















// import React from 'react';

// import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
// import {
//   PendingRechargesSvgIcon,
//   PerformedRechargesSvgIcon,
//   ValidatedRechargesSvgIcon,
// } from '@/app/svg_components/SvgIcons';
// import { useRecharges } from '@/hooks/useRecharges';

// import RechargesTable from './RechargesTable';

// const RechargesTableModule = () => {
//   const {  recharges, } = useRecharges();
//   return (
//     <div className=' w-[100%]'>

//       <div className='flex items-center gap-4 py-4'>
//         <StatsCard
//           value="10k"
//           label="Recharges effectuées"
//           icon={<PerformedRechargesSvgIcon />}
//           color="black"
//           borderColor="border-primaryAppearance"
//           trend={{ value: '+ 5.5%', isPositive: true }}
//         />
//         <StatsCard
//           value="3.7k"
//           label="Recharges validées"
//           icon={<ValidatedRechargesSvgIcon />}
//           color="#0E8345"
//           borderColor="border-borderGreen"
//         />
//         <StatsCard
//           value="90"
//           label="Recharges en attente"
//           icon={<PendingRechargesSvgIcon />}
//           color="#F6BC2F"
//           borderColor="border-pendingYelloW"
//         />
//       </div>

//       <RechargesTable recharges={ recharges } />

//     </div>
//   )
// }

// export default RechargesTableModule