import React from 'react';

import {
  contactColumns,
  TransformedContactType,
} from '@/app/(dashboard)/contacts/_component/ContactTableElements';
import {
  ContactTableModuleProps,
} from '@/app/(dashboard)/contacts/_component/ContactTableModule';
import GenericTable from '@/app/_components/tables/GenericTable';

const OneGroupTable: React.FC <ContactTableModuleProps> = ({ contacts }) => {

  const transformedData = React.useMemo(() => 
    contacts?.map((contact) => ({
      id: contact.id,
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email || '-',
      phoneNumber: contact.phoneNumber,
      country: contact.country,
      city: contact.city,
      enterprise: contact.enterprise,
      createdAt: new Date(contact.createdAt).toLocaleDateString(),
      status: contact.archived ? 'Inactive' : 'Active', 
      smsSenderId: contact.smsSenderId || '', 
      activityDomain: contact.activityDomain || '', 
      villeEntreprise: contact.villeEntreprise || '', 
      user: contact.user || null, // Pass the full user object or null
      pays: contact?.pays || '',
      archived: contact.archived // Add archived property to match TransformedContactType
    })), [contacts]
  );

  const [data, setData] = React.useState(transformedData || []);


  // Update data when contacts prop changes
  React.useEffect(() => {
    setData(transformedData || []);
  }, [transformedData]);

  const handleReorder = (reorderedData: typeof data) => {
    setData(reorderedData);
  };

  return (
    <GenericTable
      data={data}
      columns={contactColumns as TransformedContactType []}
      title="Listes des Contacts"
      description="Liste de toutes les catégories disponibles"
      defaultPageSize={7}
      // onEdit={(row) => console.log('Edit:', row)}
      // onDelete={(row) => console.log('Delete:', row)}
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

export default OneGroupTable;
