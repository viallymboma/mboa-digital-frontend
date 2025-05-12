import { create } from 'zustand';

import { EnterpriseContactResponseType } from '@/types/contact';

interface ContactState {
    contacts: EnterpriseContactResponseType[];
    selectedContacts: string[];
    isLoading: boolean;
    error: Error | null;
    setContacts: (contacts: EnterpriseContactResponseType[]) => void;
    toggleContact: (contactId: string) => void;
    clearSelectedContacts: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
    contacts: [],
    selectedContacts: [],
    isLoading: false,
    error: null,
    setContacts: (contacts) => set({ contacts }),
    toggleContact: (contactId) =>
        set((state) => ({
            selectedContacts: state.selectedContacts.includes(contactId)
                ? state.selectedContacts.filter((id) => id !== contactId)
                : [...state.selectedContacts, contactId],
            })),
    clearSelectedContacts: () => set({ selectedContacts: [] }),
}));