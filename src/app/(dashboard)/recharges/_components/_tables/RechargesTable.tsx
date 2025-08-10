import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';
import { RechargeListContentType } from '@/types/recharges';

import { rechargesColumns } from './RechargesTableElements';

type ReachargeCompProp = {
  recharges?: RechargeListContentType[];
  // recharges?: typeof dummyRechargesData;
};

const RechargesTable: React.FC<ReachargeCompProp> = ({ recharges }) => {

  const [data, setData] = React.useState<RechargeListContentType[]>();
  // If you want to use the recharges data from the store, you can set it here
  React.useEffect(() => {
    if (recharges && recharges.length > 0) {
      setData(recharges);
    }
  }
  , [recharges]);

  const handleReorder = (reorderedData: typeof recharges) => {
    setData(reorderedData); // Update the data state
  };

  return (
    <GenericTable
      data={data as RechargeListContentType[]}
      columns={rechargesColumns}
      title="Listes des Recharges"
      description="Liste de toutes les catégories disponibles"
      defaultPageSize={7}
      onReorder={handleReorder} // Pass the reorder handler
    />
  );
};

export default RechargesTable;
