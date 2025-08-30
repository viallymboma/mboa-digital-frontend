"use client";
import {
  Loader2,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { useTranslations } from 'use-intl';

import { useDashboardStats } from '@/hooks/useDashboardStat';

import { Badge } from './badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

export type StatCardProps = {
  title: string;
  value: string | number;
  trend: {
    value: string;
    direction: 'up' | 'down';
    // color: string;
  };
  description: string;
  footer: string;
}

export function SectionCards() {
  const t = useTranslations('dashboard.sectionCards');
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-white dark:bg-gray-800">
            <CardHeader className="relative">
              <Loader2 className="h-8 w-8 animate-spin" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  const dashboardStats: StatCardProps[] = [
    {
      title: t('sentSMS.title'),
      value: stats?.sentSMS.value.toLocaleString() || '0',
      trend: { 
        value: stats?.sentSMS.trend || '0%', 
        direction: stats?.sentSMS.trend.startsWith('-') ? 'down' : 'up' 
      },
      description: t('sentSMS.description'),
      footer: t('sentSMS.footer'),
    },
    {
      title: t('smsCredits.title'),
      value: stats?.smsCredits.value.toLocaleString() || '0',
      trend: { 
        value: stats?.smsCredits.trend || '0%', 
        direction: stats?.smsCredits.trend.startsWith('-') ? 'down' : 'up'
      },
      description: t('smsCredits.description'),
      footer: t('smsCredits.footer'),
    },
    {
      title: t('totalContacts.title'),
      value: stats?.totalContacts.value.toLocaleString() || '0',
      trend: { 
        value: stats?.totalContacts.trend || '0%', 
        direction: stats?.totalContacts.trend.startsWith('-') ? 'down' : 'up'
      },
      description: t('totalContacts.description'),
      footer: t('totalContacts.footer'),
    },
    {
      title: t('totalRecharges.title'),
      value: stats?.totalRecharges.value.toLocaleString() || '0',
      trend: { 
        value: stats?.totalRecharges.trend || '0%', 
        direction: stats?.totalRecharges.trend.startsWith('-') ? 'down' : 'up'
      },
      description: t('totalRecharges.description'),
      footer: t('totalRecharges.footer'),
    },
  ];

  return (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
}
// export function SectionCards() {
//     const { data: stats, isLoading } = useDashboardStats ();

//     if (isLoading) {
//         return (
//             <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
//                 {[1, 2, 3, 4].map((i) => (
//                     <Card key={i} className="bg-white dark:bg-gray-800">
//                         <CardHeader className="relative">
//                             <Loader2 className="h-8 w-8 animate-spin" />
//                         </CardHeader>
//                     </Card>
//                 ))}
//             </div>
//         );
//     }

//     const dashboardStats: StatCardProps[] = [
//         {
//             title: 'SMS Envoyés',
//             value: stats?.sentSMS.value.toLocaleString() || '0',
//             trend: { 
//                 value: stats?.sentSMS.trend || '0%', 
//                 direction: stats?.sentSMS.trend.startsWith('-') ? 'down' : 'up' 
//             },
//             description: 'Evolution mensuelle des envois',
//             footer: 'Total des SMS envoyés ce mois'
//         },
//         {
//             title: 'Crédit SMS',
//             value: stats?.smsCredits.value.toLocaleString() || '0',
//             trend: { 
//                 value: stats?.smsCredits.trend || '0%', 
//                 direction: stats?.smsCredits.trend.startsWith('-') ? 'down' : 'up'
//             },
//             description: 'Evolution du crédit SMS',
//             footer: 'Solde SMS disponible'
//         },
//         {
//             title: 'Total des Contacts',
//             value: stats?.totalContacts.value.toLocaleString() || '0',
//             trend: { 
//                 value: stats?.totalContacts.trend || '0%', 
//                 direction: stats?.totalContacts.trend.startsWith('-') ? 'down' : 'up'
//             },
//             description: 'Evolution de la base contacts',
//             footer: 'Nombre total de contacts'
//         },
//         {
//             title: 'Total des recharges',
//             value: stats?.totalRecharges.value.toLocaleString() || '0',
//             trend: { 
//                 value: stats?.totalRecharges.trend || '0%', 
//                 direction: stats?.totalRecharges.trend.startsWith('-') ? 'down' : 'up'
//             },
//             description: 'Evolution des recharges',
//             footer: 'Nombre total de recharges'
//         }
//     ];

//     return (
//         <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
//             {dashboardStats.map((stat, index) => (
//                 <StatCard key={index} {...stat} />
//             ))}
//         </div>
//     );
// }

const StatCard = ({ title, value, trend, description, footer }: StatCardProps) => {
  const TrendIcon = trend.direction === 'up' ? TrendingUpIcon : TrendingDownIcon;
  
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="relative">
        <CardDescription className="text-gray-500 dark:text-gray-400">{title}</CardDescription>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge 
            // variant={trend.direction === 'up' ? 'success' : 'destructive'} 
            className="flex items-center gap-1"
          >
            <TrendIcon className="h-3 w-3" />
            {trend.value}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          {description} <TrendIcon className="h-4 w-4" />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{footer}</div>
      </CardFooter>
    </Card>
  );
};
