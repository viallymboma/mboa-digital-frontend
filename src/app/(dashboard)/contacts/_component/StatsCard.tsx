import React from 'react';

import {
  TrendingUp,
} from 'lucide-react'; // Adjust icon import based on your icon library

import {
  Card,
  CardContent,
} from '@/components/ui/card'; // Adjust import based on your UI library
import { cn } from '@/lib/utils'; // Utility for conditional class names

interface StatsCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  borderColor?: string;
  color?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  icon,
  color, 
  borderColor = 'border-primary',
  trend,
}) => {
    return (
        <Card className={cn('overflow-hidden w-full flex flex-col items-center', borderColor)}>
            <CardContent className='flex flex-row justify-between w-full items-center gap-4 py-[1.5rem]'>
                <div className='flex flex-col'>
                    <div className="flex flex-row h-full items-center gap-2">
                        <h3 className={`text-[30px] text-${ color } font-bold tracking-tight`}>{value}</h3>
                        {trend && (
                        <div
                            className={cn(
                                'flex items-center rounded-md px-2 py-1 text-xs font-medium',
                                trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            )}
                        >
                            <TrendingUp className="mr-1 h-3 w-3" />
                            <span className='text-[12px]'>{trend.value}</span>
                        </div>
                        )}
                    </div>
                    <div>
                        <h1 className='text-black'>{label}</h1>
                    </div>
                </div>
                <div>{icon}</div>
            </CardContent>
        </Card>
    );
};

export default StatsCard;