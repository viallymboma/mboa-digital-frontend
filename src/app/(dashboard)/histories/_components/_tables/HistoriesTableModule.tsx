import React from 'react';

import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
import {
  DeliveredSMSSvgIcon,
  FailedSMSSvgIcon,
  SentSmsSvgIcon,
} from '@/app/svg_components/SvgIcons';

import HistoriesTable from './HistoriesTable';

const HistoriesTableModule = () => {
  return (
    <div className=' w-[100%]'>

      <div className='flex items-center gap-4 py-4'>
        <StatsCard
          value="10k"
          label="Messages envoyés"
          icon={<SentSmsSvgIcon />}
          color="black"
          borderColor="border-primaryAppearance"
          trend={{ value: '+ 5.5%', isPositive: true }}
        />
        <StatsCard
          value="3.7k"
          label="Messages délivrés"
          icon={<DeliveredSMSSvgIcon />}
          color="#0E8345"
          borderColor="border-borderGreen"
        />
        <StatsCard
          value="90"
          label="Messages Echoués"
          icon={<FailedSMSSvgIcon />}
          color="#DE1135"
          borderColor="border-borderRed"
        />
      </div>

      <HistoriesTable />

    </div>
  )
}

export default HistoriesTableModule