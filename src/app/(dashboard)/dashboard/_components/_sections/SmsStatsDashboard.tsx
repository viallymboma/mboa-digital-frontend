"use client";

import { SmsStatisticsSvgIcon } from '@/app/svg_components/SvgIcons';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSmsStatsStore } from '@/stores/smsStore';

import { LineChart } from './LineChart';

// import { LineChart } from "./line-chart";

export function SmsStatsDashboard() {
  const { monthlyData } = useSmsStatsStore();

  return (
    <div className="w-full border-[1px] rounded-3xl h-[428px] border-primaryAppearance">
      <Card className="border-2 border-purple-100 rounded-3xl overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-2 border-[1px] border-greyColor rounded-lg">
            {/* <BarChart3 className="h-8 w-8 text-gray-700" /> */}
            <SmsStatisticsSvgIcon />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Statistiques SMS</CardTitle>
            <p className="text-gray-500">Liste de toutes les catégories disponibles</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-t border-gray-200 my-4"></div>
          
          <div className="mt-4">
            <LineChart data={monthlyData} height={400} width={800} />
          </div>
          
          <div className="flex justify-center mt-6 gap-12">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-600"></div>
              <span className="text-[12px] font-medium">SMS envoyés</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-900"></div>
              <span className="text-[12px] font-medium">SMS échoués</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}