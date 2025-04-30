import React from 'react';

import {
  contactColumns,
} from '@/app/(dashboard)/contacts/_component/ContactTableElements';
import { dummyDataReal } from '@/app/(dashboard)/contacts/_component/dummyData';
import GenericTable from '@/app/_components/tables/GenericTable';

const OneEtablissementTable = () => {

  const [data, setData] = React.useState(dummyDataReal);

  const handleReorder = (reorderedData: typeof dummyDataReal) => {
    setData(reorderedData); // Update the data state
  };

  return (
    <GenericTable
      data={data}
      columns={contactColumns}
      title="Listes des Contacts"
      description="Liste de toutes les catégories disponibles"
      defaultPageSize={7}
      onEdit={(row) => console.log('Edit:', row)}
      onDelete={(row) => console.log('Delete:', row)}
      onReorder={handleReorder} // Pass the reorder handler
    />
  );

  // const [data, setData] = React.useState(dummyDataReal);

  // const handleReorder = (reorderedData: typeof dummyDataReal) => {
  //   setData(reorderedData); // Update the data state
  // };

  // return (
  //   <GenericTable
  //     data={data}
  //     columns={contactColumns}
  //     title="Listes des Contacts"
  //     description="Liste de toutes les catégories disponibles"
  //     defaultPageSize={7}
  //     onEdit={(row) => console.log('Edit:', row)}
  //     onDelete={(row) => console.log('Delete:', row)}
  //     onReorder={handleReorder} // Pass the reorder handler
  //   />
  // );
  // return (
  //   <GenericTable
  //     data={dummyDataReal}
  //     columns={contactColumns}
  //     title="Listes des Contacts"
  //     description="Liste de toutes les catégories disponibles"
  //     defaultPageSize={7}
  //     onEdit={(row) => console.log('Edit:', row)}
  //     onDelete={(row) => console.log('Delete:', row)}
  //   />
  // );
};

export default OneEtablissementTable;
