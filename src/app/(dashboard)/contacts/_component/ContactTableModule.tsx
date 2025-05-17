import React from 'react';

import {
  ContactStatisticsSvgIcon,
  UnavailableContactSvgIcon,
  WorkingContactSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { EnterpriseContactResponseType } from '@/types/contact';

import ContactTable from './ContactTable';
import StatsCard from './StatsCard';

export type ContactTableModuleProps = {
  contacts?: EnterpriseContactResponseType[]; // Adjust the type as per your data structure
};

const ContactTableModule: React.FC <ContactTableModuleProps> = ({ contacts }) => {
  return (
    <div className=' w-[100%]'>

      <div className='flex items-center gap-4 py-4'>
        <StatsCard
          // value="25k"
          value={ contacts?.length || "0" } // Assuming contacts are available
          label="Total de contacts"
          icon={<ContactStatisticsSvgIcon />}
          color="black"
          borderColor="border-primaryAppearance"
          trend={{ value: '+ 5.5%', isPositive: true }}
        />
        <StatsCard
          value={ contacts?.filter((contact) => !contact.archived).length || "0" } // Assuming archived contacts are unavailable
          // "2200"
          label="Total de contacts"
          icon={<WorkingContactSvgIcon />}
          color={"#0E8345"}
          borderColor="border-borderGreen"
        />
        <StatsCard
          value={ contacts?.filter((contact) => contact.archived).length || "0" } // Assuming archived contacts are unavailable
          // value="300"
          label="Total de contacts"
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