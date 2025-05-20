"use client";
import React from 'react';

import GenericTable from '@/app/_components/tables/GenericTable';
import { useContacts } from '@/hooks/useContacts';

import {
  contactColumns,
  TransformedContactType,
} from './ContactTableElements';
import { ContactTableModuleProps } from './ContactTableModule';

const ContactTable: React.FC <ContactTableModuleProps> = ({ contacts }) => {

  const { editContact, deleteContact } = useContacts();

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
      enterprise: contact.enterprise.socialRaison,
      createdAt: new Date(contact.createdAt).toLocaleDateString(),
      status: contact.archived ? 'Inactive' : 'Active'
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
      description="Liste de tout les contacts disponibles"
      defaultPageSize={7}
      onEdit={ (row) => editContact (row) }
      onDelete={ (row) => deleteContact (row.id) }
      onReorder={handleReorder} // Pass the reorder handler
    />
  );
};

export default ContactTable;
