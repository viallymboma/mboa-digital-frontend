import { create } from 'zustand';

import { EnterpriseContactResponseType } from '@/types/contact';

interface ContactState {
    contacts: EnterpriseContactResponseType[];
    selectedContacts: string[];
    isLoading: boolean;
    error: Error | null;
    setContacts: (contacts: EnterpriseContactResponseType[]) => void;
    addContact: (contact: EnterpriseContactResponseType) => void; 
    updateContact: (contact: EnterpriseContactResponseType) => void;
    removeContact: (contactId: string) => void;
    toggleContact: (contactId: string) => void;
    clearSelectedContacts: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
    contacts: [],
    selectedContacts: [],
    isLoading: false, 
    error: null, 
    setContacts: (contacts) => set({ contacts }),
    addContact: (contact) => set((state) => ({
        contacts: [contact, ...state.contacts]
    })),
    updateContact: (updatedContact) => set((state) => ({
        contacts: state.contacts.map(contact => 
            contact.id === updatedContact.id ? updatedContact : contact
        )
    })),
    removeContact: (contactId) => set((state) => ({
        contacts: state.contacts.filter(contact => contact.id !== contactId)
    })),
    toggleContact: (contactId) =>
        set((state) => ({
            selectedContacts: state.selectedContacts.includes(contactId)
                ? state.selectedContacts.filter((id) => id !== contactId)
                : [...state.selectedContacts, contactId],
            })),
    clearSelectedContacts: () => set({ selectedContacts: [] }),
}));