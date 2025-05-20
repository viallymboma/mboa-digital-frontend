import { create } from 'zustand';

import {
  TransformedContactType,
} from '@/app/(dashboard)/contacts/_component/ContactTableElements';
import { EnterpriseContactResponseType } from '@/types/contact';

interface ContactState {
    contacts: EnterpriseContactResponseType[];
    selectedContacts: string[];
    selectedContactsData: EnterpriseContactResponseType[]; // New state for selected contacts data
    isLoading: boolean;
    error: Error | null;
    setContacts: (contacts: EnterpriseContactResponseType[]) => void;
    addContact: (contact: EnterpriseContactResponseType) => void;
    updateContact: (contact: EnterpriseContactResponseType) => void;
    removeContact: (contactId: string) => void;
    toggleContact: (contactId: string) => void;
    clearSelectedContacts: () => void;
    // New methods
    setSelectedContactsData: (contacts: EnterpriseContactResponseType[]) => void;
    addSelectedContact: (contact: EnterpriseContactResponseType) => void;
    removeSelectedContact: (contactId: string) => void;
    toggleMultipleContacts: (contacts: TransformedContactType[]) => void;
    unToggleMultipleContacts: () => void;
    toggleAllContacts: (contacts: TransformedContactType[]) => void;
}

export const useContactStore = create<ContactState>((set) => ({
    contacts: [],
    selectedContacts: [],
    selectedContactsData: [], // Initialize empty array
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
    toggleContact: (contactId) => set((state) => {
        const isSelected = state.selectedContacts.includes(contactId);
        const contact = state.contacts.find(c => c.id === contactId);
        
        return {
            selectedContacts: isSelected
                ? state.selectedContacts.filter((id) => id !== contactId)
                : [...state.selectedContacts, contactId],
            selectedContactsData: isSelected
                ? state.selectedContactsData.filter(c => c.id !== contactId)
                : contact 
                    ? [...state.selectedContactsData, contact]
                    : state.selectedContactsData
        };
    }),

    clearSelectedContacts: () => set({ 
        selectedContacts: [],
        selectedContactsData: []
    }),

    // New methods implementation
    setSelectedContactsData: (contacts) => set({ selectedContactsData: contacts }),
    addSelectedContact: (contact) => set((state) => ({
        selectedContactsData: [...state.selectedContactsData, contact],
        selectedContacts: [...state.selectedContacts, contact.id]
    })),

    removeSelectedContact: (contactId) => set((state) => ({
        selectedContactsData: state.selectedContactsData.filter(c => c.id !== contactId),
        selectedContacts: state.selectedContacts.filter(id => id !== contactId)
    })), 

    toggleMultipleContacts: (contacts) => set((state) => {
        const currentIds = state.selectedContactsData.map(c => c.id);

        // Find contacts to add (not currently selected)
        const contactsToAdd = contacts.filter(c => !currentIds.includes(c.id));
        
        return {
            selectedContactsData: [...state.selectedContactsData, ...contactsToAdd],
            selectedContacts: [...currentIds, ...contactsToAdd.map(c => c.id)]
        };
    }),

    unToggleMultipleContacts: () => set(() => {
        return {
            selectedContactsData: [],
            selectedContacts: []
        };
    }),

    toggleAllContacts: (contacts) => set((state) => {
        if (state.selectedContactsData.length === contacts.length) {
            // If all are selected, deselect all
            return {
                selectedContactsData: [],
                selectedContacts: []
            };
        } else {
            // Otherwise, select all
            return {
                selectedContactsData: contacts,
                selectedContacts: contacts.map(c => c.id)
            };
        }
    })
}));