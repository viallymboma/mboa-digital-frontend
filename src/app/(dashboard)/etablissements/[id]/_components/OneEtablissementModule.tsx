"use client";
import React from 'react';

import StatsCard from '@/app/(dashboard)/contacts/_component/StatsCard';
import {
  ContactStatisticsSvgIcon,
  UnavailableContactSvgIcon,
  WorkingContactSvgIcon,
} from '@/app/svg_components/SvgIcons';

import OneEtablissementTable from './OneEtablissementTable';

const OneEtablissementModule = () => {
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
                    color="#0E8345"
                    borderColor="border-borderGreen"
                />
                <StatsCard
                    value="300"
                    label="Total de contacts"
                    icon={<UnavailableContactSvgIcon />}
                    color="#DE1135"
                    borderColor="border-borderRed"
                />
            </div>
            <OneEtablissementTable />
        </div>
    )
}

export default OneEtablissementModule