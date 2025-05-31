"use client";
import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';

// import { useContacts } from '@/hooks/useContacts';
import {
  contactColumns,
  TransformedContactType,
} from './ContactTableElements';
import { ContactTableModuleProps } from './ContactTableModule';

const ContactTable: React.FC <ContactTableModuleProps> = ({ contacts }) => {

  // const {  editContact,  deleteContact } = useContacts();

  // Transform the contacts data to match dummy data structure
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

  // const handleEdit = (row: TransformedContactType) => {
  //   // Create a proper UpdateContactRequestType object
  //   const contactData = {
  //     ...row,
  //     user: row.user || contacts?.find(c => c.id === row.id)?.user // Fallback to original contact's user
  //   };
  //   editContact(contactData);
  // };

  return (
    <GenericTable
      data={data}
      columns={contactColumns as TransformedContactType []}
      title="Listes des Contacts"
      description="Liste de tout les contacts disponibles"
      defaultPageSize={7}
      // onEdit={ handleEdit }
      // onDelete={ (row) => deleteContact (row.id) }
      onReorder={handleReorder} // Pass the reorder handler
    />
  );
};

export default ContactTable;
