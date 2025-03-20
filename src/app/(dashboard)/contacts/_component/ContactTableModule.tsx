import React from 'react';

import {
  ContactStatisticsSvgIcon,
  UnavailableContactSvgIcon,
  WorkingContactSvgIcon,
} from '@/app/svg_components/SvgIcons';

import ContactTable from './ContactTable';
import StatsCard from './StatsCard';

const ContactTableModule = () => {
  return (
    <div className=' w-[100%]'>
      <div className='flex items-center gap-4 py-4'>
      <StatsCard
        value="25k"
        label="Total de contacts"
        icon={<ContactStatisticsSvgIcon />}
        color="black"
        borderColor="border-primaryAppearance"
        trend={{ value: '+ 5.5%', isPositive: true }}
      />
      <StatsCard
        value="2200"
        label="Total de contacts"
        icon={<WorkingContactSvgIcon />}
        color="borderGreen"
        borderColor="border-borderGreen"
      />
      <StatsCard
        value="300"
        label="Total de contacts"
        icon={<UnavailableContactSvgIcon />}
        color="borderRed"
        borderColor="border-borderRed"
      />

      </div>
      <ContactTable />
    </div>
  )
}

export default ContactTableModule