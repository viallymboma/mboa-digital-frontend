import { create } from 'zustand';

interface CarrierData {
  name: string;
  count: number;
  color: string;
}

interface ContactsState {
  totalContacts: number;
  carriers: CarrierData[];
  updateCarriers: (carriers: CarrierData[]) => void;
  updateTotalContacts: (count: number) => void;
}

export const useContactsStore = create<ContactsState>((set) => ({
  totalContacts: 5200,
  carriers: [
    { name: 'Orange', count: 2100, color: 'rgb(147, 51, 234)' },
    { name: 'Camtel', count: 1300, color: 'rgb(168, 85, 247)' },
    { name: 'Mtn', count: 1050, color: 'rgb(192, 132, 252)' },
    { name: 'Nextell', count: 750, color: 'rgb(216, 180, 254)' },
  ],
  updateCarriers: (carriers) => set({ carriers }),
  updateTotalContacts: (totalContacts) => set({ totalContacts }),
}));