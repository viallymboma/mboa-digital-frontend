"use client";
import React from 'react';

import Link from 'next/link';

import {
  GroupSvgIcon,
  HistorySvgIcon,
  PlusMessaginSvgIcon,
  RechargesSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { useDashboardStore } from '@/stores/dashboardStore';

import ContactsDashboard from './ContactsDashboard';
import { DidYouKnow } from './DidYouKnow';
import { NavigationCard } from './NavigationCard';
import { SmsStatsDashboard } from './SmsStatsDashboard';
import { StatCard } from './StatCard';

const FIrstSection = () => {
    const { username, stats } = useDashboardStore();
  return (
    <section className='flex flex-row gap-4'>
        <div className='flex flex-col gap-4'>
            <div className="w-[470px] border-[1px] border-primaryAppearance max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl h-[503px] relative">
                
                <div className="bg-purple-600 p-8 mb-6 relative overflow-hidden rounded-b-[20px] h-[210px]">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUwIDUwQzUwIDM2LjE5IDYxLjE5IDI1IDc1IDI1SDEyNUMxMzguODEgMjUgMTUwIDM2LjE5IDE1MCA1MFYxNTBDMTUwIDE2My44MSAxMzguODEgMTc1IDEyNSAxNzVINzVDNjEuMTkgMTc1IDUwIDE2My44MSA1MCAxNTBWNTBaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjgiLz48L3N2Zz4=')]"></div>
                    </div>
                    <h1 className="text-4xl md:text-[36px] text-white relative pt-5 z-10">
                        Bienvenue <span className="font-bold">{username}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bottom-[8%] absolute h-[358px]">
                    {stats.map((stat) => (
                    <StatCard
                        key={stat.id}
                        value={stat.value}
                        label={stat.label}
                        icon={stat.icon}
                        change={stat.change}
                        isPositive={stat.isPositive}
                        // className="border-2 border-purple-100"
                        className="border-[1px] border-primaryAppearance h-[169px] w-[201]"
                    />
                    ))}
                </div>
            </div>
            <div>
                <ContactsDashboard />
            </div>
        </div>
        <div className='w-full flex flex-col gap-4'>
            <div className='flex flex-row gap-4'>
                {/* Navigation Cards */}
                <div className="md:col-span-2 grid grid-cols-2 gap-6">
                    <Link href="/contacts" className="block">
                        <NavigationCard 
                            icon={GroupSvgIcon} 
                            borderColor="border-purple-500"
                        />
                    </Link>
                    <Link href="/sms-stats" className="block">
                        <NavigationCard 
                            icon={PlusMessaginSvgIcon} 
                            borderColor="border-blue-500"
                        />
                    </Link>
                    <Link href="#" className="block">
                        <NavigationCard 
                            icon={RechargesSvgIcon} 
                            borderColor="border-purple-500"
                        />
                    </Link>
                    <Link href="#" className="block">
                        <NavigationCard 
                            icon={HistorySvgIcon} 
                            borderColor="border-purple-500"
                        />
                    </Link>
                </div>
                <DidYouKnow />
            </div>
            <div>
                <SmsStatsDashboard />
            </div>
        </div>
    </section>
  )
}

export default FIrstSection