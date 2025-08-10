import React from 'react';

import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
import {
  DeliveredSMSSvgIcon,
  FailedSMSSvgIcon,
  SentSmsSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { useHistories } from '@/hooks/useHistories';

import HistoriesTable from './HistoriesTable';

const HistoriesTableModule = () => {
  const { histories } = useHistories();

  const stats = React.useMemo(() => {
    const totalSent = histories.length;
    const delivered = histories.filter((h) => h.status === 'Delivered').length;
    const failed = histories.filter((h) => h.status === 'Failed').length;

    return {
      sent: totalSent,
      delivered,
      failed,
      sentTrend: totalSent > 0 ? `+${((totalSent / (totalSent + 1)) * 100).toFixed(1)}%` : '0%',
    };
  }, [histories]);

  return (
    <div className="w-[100%]">
      <div className="flex items-center gap-4 py-4">
        <StatsCard
          value={stats.sent.toLocaleString('fr-FR')}
          label="Messages envoyés"
          icon={<SentSmsSvgIcon />}
          color="black"
          borderColor="border-primaryAppearance"
          trend={{ value: stats.sentTrend, isPositive: true }}
        />
        <StatsCard
          value={stats.delivered.toLocaleString('fr-FR')}
          label="Messages délivrés"
          icon={<DeliveredSMSSvgIcon />}
          color="#0E8345"
          borderColor="border-borderGreen"
        />
        <StatsCard
          value={stats.failed.toLocaleString('fr-FR')}
          label="Messages échoués"
          icon={<FailedSMSSvgIcon />}
          color="#DE1135"
          borderColor="border-borderRed"
        />
      </div>
      <HistoriesTable />
    </div>
  );
};

export default HistoriesTableModule;
