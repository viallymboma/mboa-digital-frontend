"use client"
import React from 'react';

import { MultipleContactsSvgIcon } from '@/app/svg_components/SvgIcons';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { ChartConfig } from '@/components/ui/chart';
import { useContactsStore } from '@/stores/contactsStore';

import DonutChart from './DonutChart';

const ContactsDashboard = () => {
    const { totalContacts, carriers } = useContactsStore();
    //   const totalVisitors = React.useMemo(() => {
    //     return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    //   }, [])
    console.log(totalContacts)
    return (
        <div className="w-[470px] max-w-4xl h-[345px]">
            <Card className="border-[1px] border-primaryAppearance rounded-3xl overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="border-[1px] border-primaryAppearance p-2 bg-gray-100 rounded-lg">
                        {/* <Users className="h-8 w-8 text-gray-700" /> */}
                        <MultipleContactsSvgIcon />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold">Contacts</CardTitle>
                        <p className="text-gray-500">Liste de toutes les catégories disponibles</p>
                    </div>
                </CardHeader>
                <CardContent>
                <div className="border-t border-gray-200 my-4"></div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <DonutChart
                        data={carriers}
                        totalValue={totalContacts}
                        size={200}
                        thickness={20}
                        gapSize={6}
                    />

                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                    {carriers.map((carrier) => (
                        <div key={carrier.name} className="flex items-center gap-2">
                        <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: carrier.color }}
                        ></div>
                        <span className="text-[12px] font-medium truncate">{carrier.name}</span>
                        </div>
                    ))}
                    </div>
                </div>
                
                {/* <div className="flex justify-center mt-8">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <span>470</span>
                    <div className="border-r border-blue-400 h-6"></div>
                    <span>345</span>
                    </div>
                </div> */}
                </CardContent>
            </Card>
        </div>
    )
}

export default ContactsDashboard