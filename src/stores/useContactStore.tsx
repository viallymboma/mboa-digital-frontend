// stores/companies.store.ts
import { create } from 'zustand';

import { EnterpriseType } from '@/types/company';

interface CompanyState {
  companies: EnterpriseType[];
  selectedCompanies: string[];
  selectedCompaniesData: EnterpriseType[];
  isLoading: boolean;
  error: Error | null;
  setCompanies: (companies: EnterpriseType[]) => void;
  addCompany: (company: EnterpriseType) => void;
  updateCompany: (company: EnterpriseType) => void;
  removeCompany: (companyId: string) => void;
  toggleCompany: (companyId: string) => void;
  clearSelectedCompanies: () => void;
  setSelectedCompaniesData: (companies: EnterpriseType[]) => void;
  addSelectedCompany: (company: EnterpriseType) => void;
  removeSelectedCompany: (companyId: string) => void;
  toggleMultipleCompanies: (companies: EnterpriseType[]) => void;
  toggleAllCompanies: (companies: EnterpriseType[]) => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companies: [],
  selectedCompanies: [],
  selectedCompaniesData: [],
  isLoading: false,
  error: null,
  setCompanies: (companies) => set({ companies }),
  addCompany: (company) => set((state) => ({
    companies: [company, ...state.companies],
  })),
  updateCompany: (updatedCompany) => set((state) => ({
    companies: state.companies.map((company) =>
      company.id === updatedCompany.id ? updatedCompany : company
    ),
  })),
  removeCompany: (companyId) => set((state) => ({
    companies: state.companies.filter((company) => company.id !== companyId),
  })),
  toggleCompany: (companyId) => set((state) => {
    const isSelected = state.selectedCompanies.includes(companyId);
    const company = state.companies.find((c) => c.id === companyId);
    return {
      selectedCompanies: isSelected
        ? state.selectedCompanies.filter((id) => id !== companyId)
        : [...state.selectedCompanies, companyId],
      selectedCompaniesData: isSelected
        ? state.selectedCompaniesData.filter((c) => c.id !== companyId)
        : company
          ? [...state.selectedCompaniesData, company]
          : state.selectedCompaniesData,
    };
  }),
  clearSelectedCompanies: () => set({
    selectedCompanies: [],
    selectedCompaniesData: [],
  }),
  setSelectedCompaniesData: (companies) => set({ selectedCompaniesData: companies }),
  addSelectedCompany: (company) => set((state) => ({
    selectedCompaniesData: [...state.selectedCompaniesData, company],
    selectedCompanies: [...state.selectedCompanies, company.id],
  })),
  removeSelectedCompany: (companyId) => set((state) => ({
    selectedCompaniesData: state.selectedCompaniesData.filter((c) => c.id !== companyId),
    selectedCompanies: state.selectedCompanies.filter((id) => id !== companyId),
  })),
  toggleMultipleCompanies: (companies) => set((state) => {
    const currentIds = state.selectedCompaniesData.map((c) => c.id);
    const companiesToAdd = companies.filter((c) => !currentIds.includes(c.id));
    return {
      selectedCompaniesData: [...state.selectedCompaniesData, ...companiesToAdd],
      selectedCompanies: [...currentIds, ...companiesToAdd.map((c) => c.id)],
    };
  }),
  toggleAllCompanies: (companies) => set((state) => {
    if (state.selectedCompaniesData.length === companies.length) {
      return {
        selectedCompaniesData: [],
        selectedCompanies: [],
      };
    } else {
      return {
        selectedCompaniesData: companies,
        selectedCompanies: companies.map((c) => c.id),
      };
    }
  }),
}));