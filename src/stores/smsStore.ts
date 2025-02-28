import { create } from 'zustand';

interface MonthlyData {
  month: string;
  sent: number;
  failed: number;
}

interface SmsStatsState {
  monthlyData: MonthlyData[];
  updateMonthlyData: (data: MonthlyData[]) => void;
}

export const useSmsStatsStore = create<SmsStatsState>((set) => ({
  monthlyData: [
    { month: 'Jan', sent: 20, failed: 25 },
    { month: 'Feb', sent: 45, failed: 35 },
    { month: 'Mar', sent: 58, failed: 50 },
    { month: 'Apr', sent: 35, failed: 70 },
    { month: 'May', sent: 78, failed: 40 },
    { month: 'Jun', sent: 55, failed: 48 },
    { month: 'Jul', sent: 35, failed: 38 },
    { month: 'Aug', sent: 40, failed: 30 },
    { month: 'Sep', sent: 70, failed: 35 },
    { month: 'Oct', sent: 60, failed: 25 },
    { month: 'Nov', sent: 50, failed: 45 },
    { month: 'Dec', sent: 55, failed: 65 },
  ],
  updateMonthlyData: (monthlyData) => set({ monthlyData }),
}));