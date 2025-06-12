import { create } from 'zustand';

import { ClientResponseType } from '@/types/client';

// import { ClientResponseType } from '@/types/clients';

interface ClientState {
    clients: ClientResponseType[];
    selectedClient: ClientResponseType | null;
    isLoading: boolean;
    error: string | null;
    setClients: (clients: ClientResponseType[]) => void;
    setSelectedClient: (client: ClientResponseType | null) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    addClient: (client: ClientResponseType) => void;
    updateClient: (client: ClientResponseType) => void;
    removeClient: (clientId: string) => void;
    toggleAllClients: (clients: ClientResponseType[]) => void;
    toggleClient: (clientId: string) => void;
    clearSelectedClients: () => void;
    selectedClientsData: ClientResponseType[];
    addSelectedClient: (client: ClientResponseType) => void;
    removeSelectedClient: (id: string) => void;
}

export const useClientStore = create<ClientState>((set) => ({
    clients: [],
    selectedClient: null,
    isLoading: false,
    error: null,
    selectedClientsData: [],
    setClients: (clients) => set({ clients }),
    setSelectedClient: (client) => set({ selectedClient: client }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    addClient: (client) => set((state) => ({ 
        clients: [...state.clients, client] 
    })),
    updateClient: (updatedClient) => set((state) => ({
        clients: state.clients.map(client => 
            client.id === updatedClient.id ? updatedClient : client
        )
    })),
    removeClient: (clientId) => set((state) => ({
        clients: state.clients.filter(client => client.id !== clientId)
    })),
    toggleAllClients: (clients) => set((state) => ({
        selectedClientsData: clients,
        clients: state.clients.map(client => ({
            ...client,
            isSelected: clients.some(c => c.id === client.id)
        }))
    })),
    toggleClient: (clientId) => set((state) => {
        const client = state.clients.find(c => c.id === clientId);
        if (!client) return state;

        const isSelected = state.selectedClientsData.some(c => c.id === clientId);
        const updatedSelectedClients = isSelected
            ? state.selectedClientsData.filter(c => c.id !== clientId)
            : [...state.selectedClientsData, client];

        return {
            selectedClientsData: updatedSelectedClients,
            clients: state.clients.map(c => 
                c.id === clientId ? { ...c, isSelected: !isSelected } : c
            )
        };
    }
    ),
    clearSelectedClients: () => set((state) => ({
        selectedClientsData: [],
        clients: state.clients.map(client => ({ ...client, isSelected: false }))
    })),
    addSelectedClient: (client) => set((state) => ({
        selectedClientsData: [...state.selectedClientsData, client],
        clients: state.clients.map(c =>
            c.id === client.id ? { ...c, isSelected: true } : c
        )
    })),
    removeSelectedClient: (id) => set((state) => ({
        selectedClientsData: state.selectedClientsData.filter(item => item.id !== id)
    })),
        
}));