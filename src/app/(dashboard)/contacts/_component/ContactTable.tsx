import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';

import { contactColumns } from './ContactTableElements';
import { dummyDataReal } from './dummyData';

const ContactTable = () => {

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
};

export default ContactTable;
