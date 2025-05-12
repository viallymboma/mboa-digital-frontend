import {
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from './badge';

interface StatCardProps {
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

export function SectionCards() {
  const stats: StatCardProps[] = [
    {
      title: 'SMS Envoyés',
      value: '$1,250.00',
      trend: { value: '+12.5%', direction: 'up' },
      description: 'Trending up this month',
      footer: 'Visitors for the last 6 months'
    },
    {
      title: 'Crédit SMS',
      value: '1,234',
      trend: { value: '-20%', direction: 'down' },
      description: 'Down 20% this period',
      footer: 'Acquisition needs attention'
    },
    {
      title: 'Total des Contacts',
      value: '45,678',
      trend: { value: '+12.5%', direction: 'up' },
      description: 'Strong user retention',
      footer: 'Engagement exceed targets'
    },
    {
      title: 'Total des recharges',
      value: '4.5%',
      trend: { value: '+4.5%', direction: 'up' },
      description: 'Steady performance',
      footer: 'Meets growth projections'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}















// import {
//   TrendingDownIcon,
//   TrendingUpIcon,
// } from 'lucide-react';

// // import { Badge } from "@/components/ui/badge"
// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';

// import { Badge } from './badge';

// export function SectionCards() {
//   return (
//     <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
//       <Card className="@container/card">
//         <CardHeader className="relative">
//           <CardDescription>Total Revenue</CardDescription>
//           <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">$1,250.00</CardTitle>
//           <div className="absolute right-4 top-4">
//             <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//               <TrendingUpIcon className="size-3" />
//               +12.5%
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Trending up this month <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Visitors for the last 6 months</div>
//         </CardFooter>
//       </Card>
//       <Card className="@container/card">
//         <CardHeader className="relative">
//           <CardDescription>New Customers</CardDescription>
//           <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">1,234</CardTitle>
//           <div className="absolute right-4 top-4">
//             <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//               <TrendingDownIcon className="size-3" />
//               -20%
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Down 20% this period <TrendingDownIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Acquisition needs attention</div>
//         </CardFooter>
//       </Card>
//       <Card className="@container/card">
//         <CardHeader className="relative">
//           <CardDescription>Active Accounts</CardDescription>
//           <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">45,678</CardTitle>
//           <div className="absolute right-4 top-4">
//             <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//               <TrendingUpIcon className="size-3" />
//               +12.5%
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Strong user retention <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Engagement exceed targets</div>
//         </CardFooter>
//       </Card>
//       <Card className="@container/card">
//         <CardHeader className="relative">
//           <CardDescription>Growth Rate</CardDescription>
//           <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">4.5%</CardTitle>
//           <div className="absolute right-4 top-4">
//             <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//               <TrendingUpIcon className="size-3" />
//               +4.5%
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Steady performance <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Meets growth projections</div>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }
