import React from 'react';

import { useTranslations } from 'next-intl';

import GenericTable from '@/app/_components/tables/GenericTable';
import { RechargeListContentType } from '@/types/recharges';

import { rechargesColumns } from './RechargesTableElements';

type ReachargeCompProp = {
  recharges?: RechargeListContentType[];
};

const RechargesTable: React.FC<ReachargeCompProp> = ({ recharges }) => {
  const t = useTranslations('recharges');

  const [data, setData] = React.useState<RechargeListContentType[]>();

  React.useEffect(() => {
    if (recharges && recharges.length > 0) {
      setData(recharges);
    }
  }, [recharges]);

  const handleReorder = (reorderedData: typeof recharges) => {
    setData(reorderedData);
  };

  return (
    <GenericTable
      data={data as RechargeListContentType[]}
      columns={rechargesColumns}
      title={t('table.title')}
      description={t('table.description')}
      defaultPageSize={7}
      onReorder={handleReorder}
    />
  );
};

export default RechargesTable;
