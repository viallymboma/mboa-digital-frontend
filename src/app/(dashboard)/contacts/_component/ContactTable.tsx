"use client";
import React from 'react';

import { useTranslations } from 'next-intl';

import GenericTable from '@/app/_components/tables/GenericTable';

import {
  contactColumns,
  TransformedContactType,
} from './ContactTableElements';
import { ContactTableModuleProps } from './ContactTableModule';

const ContactTable: React.FC <ContactTableModuleProps> = ({ contacts }) => {
  const t = useTranslations('contact');

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
      user: contact.user || null,
      pays: contact?.pays || '',
      archived: contact.archived
    })), [contacts]
  );

  const [data, setData] = React.useState(transformedData || []);

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
      title={t('table.title')}
      description={t('table.description')}
      defaultPageSize={7}
      onReorder={handleReorder}
    />
  );
};

export default ContactTable;
