import React from 'react';

import { useTranslation } from 'react-i18next';

import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
import { ContactStatisticsSvgIcon } from '@/app/svg_components/SvgIcons';
import { UserType } from '@/types/company';

import UserTable from './UserTable';

// import UserTable from './UserTable';

export type UserTableModuleProps = {
  users?: UserType[];
};

const UserTableModule: React.FC<UserTableModuleProps> = ({ users }) => {
  const { t } = useTranslation();

  return (
    <div className="w-[100%]">
      <div className="flex items-center gap-4 py-4">
        <StatsCard
          value={users?.length || '0'}
          label={t('company.users.totalUsers', { defaultValue: 'Total Users' })}
          icon={<ContactStatisticsSvgIcon />}
          color="black"
          borderColor="border-primaryAppearance"
          trend={{ value: '+ 5.5%', isPositive: true }}
        />
      </div>
      <UserTable users={users} />
    </div>
  );
};

export default UserTableModule;