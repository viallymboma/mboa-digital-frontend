import React from 'react';

import { useTranslations } from 'next-intl';

import {
  contactColumns,
  TransformedContactType,
} from '@/app/(dashboard)/contacts/_component/ContactTableElements';
import {
  ContactTableModuleProps,
} from '@/app/(dashboard)/contacts/_component/ContactTableModule';
import GenericTable from '@/app/_components/tables/GenericTable';

const OneGroupTable: React.FC <ContactTableModuleProps> = ({ contacts }) => {
  const t = useTranslations('group.table');

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
      status: contact.archived ? t('inactive') : t('active'), 
      smsSenderId: contact.smsSenderId || '', 
      activityDomain: contact.activityDomain || '', 
      villeEntreprise: contact.villeEntreprise || '', 
      user: contact.user || null,
      pays: contact?.pays || '',
      archived: contact.archived
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
      title={t('title')}
      description={t('description')}
      defaultPageSize={7}
      onReorder={handleReorder}
    />
  );
};

export default OneGroupTable;
