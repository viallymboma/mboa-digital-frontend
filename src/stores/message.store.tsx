import { create } from 'zustand';

import { MessageType } from '@/types/messages';

interface MessageState {
    messages: MessageType[];
    totalPages: number;
    currentPage: number;
    totalElements: number;
    isLoading: boolean;
    error: Error | null;
    setMessages: (messages: MessageType[]) => void;
    setTotalPages: (total: number) => void;
    setCurrentPage: (page: number) => void;
    setTotalElements: (total: number) => void;
    addMessage: (message: MessageType) => void;
    clearMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
    messages: [],
    totalPages: 0,
    currentPage: 0,
    totalElements: 0,
    isLoading: false,
    error: null,

    setMessages: (messages) => set({ messages }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setTotalElements: (totalElements) => set({ totalElements }),
    
    addMessage: (message) => set((state) => ({
        messages: [message, ...state.messages]
    })),

    clearMessages: () => set({ 
        messages: [],
        totalPages: 0,
        currentPage: 0,
        totalElements: 0
    }),
}));