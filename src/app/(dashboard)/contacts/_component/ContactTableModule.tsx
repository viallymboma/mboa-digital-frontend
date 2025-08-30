import React from 'react';

import { useTranslations } from 'next-intl';

import {
  ContactStatisticsSvgIcon,
  UnavailableContactSvgIcon,
  WorkingContactSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { EnterpriseContactResponseType } from '@/types/contact';

import ContactTable from './ContactTable';
import StatsCard from './StatsCard';

export type ContactTableModuleProps = {
  contacts?: EnterpriseContactResponseType[];
};

const ContactTableModule: React.FC <ContactTableModuleProps> = ({ contacts }) => {
  const t = useTranslations('contact.statsCard');
  
  return (
    <div className=' w-[100%]'>
      <div className='flex items-center gap-4 py-4'>
        <StatsCard
          value={ contacts?.length || "0" }
          label={t('totalContacts')}
          icon={<ContactStatisticsSvgIcon />}
          color="black"
          borderColor="border-primaryAppearance"
          trend={{ value: '+ 5.5%', isPositive: true }}
        />
        <StatsCard
          value={ contacts?.filter((contact) => !contact.archived).length || "0" }
          label={t('activeContacts')}
          icon={<WorkingContactSvgIcon />}
          color={"#0E8345"}
          borderColor="border-borderGreen"
        />
        <StatsCard
          value={ contacts?.filter((contact) => contact.archived).length || "0" }
          label={t('inactiveContacts')}
          icon={<UnavailableContactSvgIcon />}
          color="#DE1135"
          borderColor="border-borderRed"
        />
      </div>
      <ContactTable contacts={ contacts } />
    </div>
  )
}

export default ContactTableModule
