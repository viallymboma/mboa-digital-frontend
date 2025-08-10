import React from 'react';

import { useTranslation } from 'react-i18next';

import GenericTable from '@/app/_components/tables/GenericTable';
import { UserType } from '@/types/company';

// import { UserType } from '@/types/auth';
import {
  TransformedUserType,
  userColumns,
} from './UserTableElements';

export type UserTableProps = {
  users?: UserType[];
};

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const { t, i18n } = useTranslation();
  const transformedData = React.useMemo(
    () =>
      users?.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
        status: user.archived ? 'Inactive' : 'Active',
      })) || [],
    [users]
  );

  const [data, setData] = React.useState(transformedData);

  React.useEffect(() => {
    setData(transformedData);
  }, [transformedData]);

  const handleReorder = (reorderedData: typeof data) => {
    setData(reorderedData);
  };

  return (
    <GenericTable
      data={data}
      columns={userColumns(i18n.language as 'en' | 'fr') as TransformedUserType[]}
      title={t('company.users.pageTitle')}
      description={t('company.users.pageDescription', { defaultValue: 'List of all users in the company' })}
      defaultPageSize={7}
      onReorder={handleReorder}
    />
  );
};

export default UserTable;
