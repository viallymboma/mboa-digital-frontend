"use client";

import {
  CreditCard,
  MessageSquare,
  MessageSquareText,
  TrendingUp,
  User,
} from 'lucide-react';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  icon: string;
  change: string;
  isPositive?: boolean;
  className?: string;
}

export function StatCard({
  value,
  label,
  icon,
  change,
  isPositive = true,
  className,
}: StatCardProps) {
  // Render the appropriate icon based on the icon string
  const renderIcon = () => {
    switch (icon) {
      case 'SentSmsSvgIcon':
        return <MessageSquare className="h-6 w-6 text-purple-600 border-1 border-primaryAppearance" />;
      case 'CreditSmsSvgIcon':
        return <MessageSquareText className="h-6 w-6 text-purple-600 border-1 border-primaryAppearance" />;
      case 'TotalContactsSvgIcon':
        return <User className="h-6 w-6 text-purple-600 border-1 border-primaryAppearance" />;
      case 'TotalRechargesSvgIcon':
        return <CreditCard className="h-6 w-6 text-purple-600 border-1 border-primaryAppearance" />;
      default:
        return <MessageSquare className="h-6 w-6 text-purple-600 border-1 border-primaryAppearance" />;
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div className=" w-10 rounded-lg bg-purple-100 p-2 flex items-center justify-center">
            {renderIcon()}
          </div>
          
          <div className=" flex flex-col justify-center ">
            <div className="flex flex-row items-center gap-2">
              <h3 className="text-[30px] font-bold tracking-tight">{value}</h3>
              <div className={cn(
                "flex items-center rounded-md px-2 py-1 text-xs font-medium",
                isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}>
                <TrendingUp className="mr-1 h-3 w-3" />
                <span className='text-[12px]'>+ {change}%</span>
              </div>
            </div>
            <p className="text-[14px] text-black text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}