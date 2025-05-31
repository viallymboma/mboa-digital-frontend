import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';

import { dummyRechargesData } from './dummyData';
import { rechargesColumns } from './RechargesTableElements';

const RechargesTable = () => {

  const [data, setData] = React.useState(dummyRechargesData);

  const handleReorder = (reorderedData: typeof dummyRechargesData) => {
    setData(reorderedData); // Update the data state
  };

  return (
    <GenericTable
      data={data}
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
