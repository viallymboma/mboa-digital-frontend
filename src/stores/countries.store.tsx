import { create } from 'zustand';

import {
  CountryType,
  PaginatedCountryResponseType,
} from '@/types/country';

interface CountryState {
    countries: CountryType[];
    selectedCountry: CountryType | null;
    pagination: {
        pageNumber: number;
        pageSize: number;
        totalElements: number;
        totalPages: number;
    };
    isLoading: boolean;
    error: Error | null;
    setCountries: (response: PaginatedCountryResponseType) => void;
    // setCountries: (response: CountryType []) => void;
    setSelectedCountry: (country: CountryType) => void;
    setPageNumber: (pageNumber: number) => void;
    setPageSize: (pageSize: number) => void;
    resetSelection: () => void;
}

export const useCountryStore = create<CountryState>((set) => ({
    countries: [],
    selectedCountry: null,
    pagination: {
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0
    },
    isLoading: false,
    error: null,
    setCountries: (response) => set({
        countries: response.content,
        pagination: {
            pageNumber: response.number,
            pageSize: response.size,
            totalElements: response.totalElements,
            totalPages: response.totalPages
        }
    }),
    // setCountries: (response: CountryType []) => set({
    //     countries: response,
    // }),
    setSelectedCountry: (country) => set({ selectedCountry: country }),
    setPageNumber: (pageNumber) => set(state => ({
        pagination: { ...state.pagination, pageNumber }
    })),
    setPageSize: (pageSize) => set(state => ({
        pagination: { ...state.pagination, pageSize }
    })),
    resetSelection: () => set({ selectedCountry: null })
}));