import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';
// import { useRechargeStore } from '@/stores/recharges.store';
// import { useRecharges } from '@/hooks/useRecharges';
import { RechargeListContentType } from '@/types/recharges';

// import { dummyRechargesData } from './dummyData';
import { rechargesColumns } from './RechargesTableElements';

type ReachargeCompProp = {
  recharges?: RechargeListContentType[];
  // recharges?: typeof dummyRechargesData;
};

const RechargesTable: React.FC<ReachargeCompProp> = ({ recharges }) => {

  const [data, setData] = React.useState<RechargeListContentType[]>();
  // const [data, setData] = React.useState(dummyRechargesData);

  // const { recharges } = useRechargeStore (); 
  // const { recharges } = useRecharges (); 
  console.log('Recharges in RechargesTable:', recharges);
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

  // const handleReorder = (reorderedData: typeof dummyRechargesData) => {
  //   setData(reorderedData); // Update the data state
  // };

  return (
    <GenericTable
      data={data as RechargeListContentType[]}
      columns={rechargesColumns}
      title="Listes des Recharges"
      description="Liste de toutes les catégories disponibles"
      defaultPageSize={7}
      // onEdit={(row) => console.log('Edit:', row)}
      // onDelete={(row) => console.log('Delete:', row)}
      onReorder={handleReorder} // Pass the reorder handler
    />
  );
};

export default RechargesTable;
