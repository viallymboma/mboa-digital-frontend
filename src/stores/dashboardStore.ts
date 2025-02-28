import { create } from 'zustand';

interface StatsItem {
  id: string;
  value: string;
  label: string;
  icon: string;
  change: string;
  isPositive: boolean;
}

interface DashboardState {
  username: string;
  stats: StatsItem[];
  updateStats: (stats: StatsItem[]) => void;
  updateUsername: (name: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  username: 'Imagichris',
  stats: [
    {
      id: 'sms-sent',
      value: '2.5K',
      label: 'SMS Envoyés',
      // icon: 'message-square',
      icon: 'SentSmsSvgIcon',
      change: '5.5',
      isPositive: true,
    },
    {
      id: 'sms-credit',
      value: '300',
      label: 'Crédit SMS',
      // icon: 'message-square-text',
      icon: 'CreditSmsSvgIcon',
      change: '5.5',
      isPositive: true,
    },
    {
      id: 'contacts',
      value: '5.2K',
      label: 'Total des Contacts',
      // icon: 'user',
      icon: 'TotalContactsSvgIcon',
      change: '5.5',
      isPositive: true,
    },
    {
      id: 'recharges',
      value: '1.78K',
      label: 'Total des recharges',
      // icon: 'credit-card',
      icon: 'TotalRechargesSvgIcon',
      change: '5.5',
      isPositive: true,
    },
  ],
  updateStats: (stats) => set({ stats }),
  updateUsername: (username) => set({ username }),
}));