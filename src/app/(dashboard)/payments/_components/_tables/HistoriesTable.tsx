import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';

import { dummyHistoriesData } from './dummyData';
// import { contactColumns } from './ContactTableElements';
// import { dummyDataReal } from './dummyData';
import { historiesColumns } from './HistoriesTableElements';

// import { dummyHistoriesData } from './dummyData';

const HistoriesTable = () => {

  const [data, setData] = React.useState(dummyHistoriesData);

  const handleReorder = (reorderedData: typeof dummyHistoriesData) => {
    setData(reorderedData); // Update the data state
  };

  return (
    <GenericTable
      data={data}
      columns={historiesColumns}
      title="Listes des Historiques"
      description="Liste de toutes les catégories disponibles"
      defaultPageSize={7}
      onEdit={(row) => console.log('Edit:', row)}
      onDelete={(row) => console.log('Delete:', row)}
      onReorder={handleReorder} // Pass the reorder handler
    />
  );
};

export default HistoriesTable;
