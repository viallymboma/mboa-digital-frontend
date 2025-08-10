'use client';
import { useCompanyStore } from '@/stores/useContactStore';
import { UserType } from '@/types/company';

import useGetLocalStorage from './useGetLocalStorage';

export function useCompanyUsers(enterpriseId: string) {
  const { getLocalStorage } = useGetLocalStorage();
  const user = getLocalStorage('user');
  const isAuthorized = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN_USER';
  const { companies } = useCompanyStore();
  console.log('useCompanyUsers - Companies:', companies);

  if (!isAuthorized) {
    return {
      users: [],
      isLoading: false,
      error: new Error('Unauthorized access'),
      refetchUsers: () => {},
    };
  }

  const company = companies.find((c) => c.id === enterpriseId);
  console.log('Company Users:', company);
  if (!company) {
    return {
      users: [],
      isLoading: false,
      error: new Error('Company not found'),
      refetchUsers: () => {},
    };
  }
  const users = company?.user ? (Array.isArray(company.user) ? company.user : [company.user]) : [];

  return {
    users: users as UserType[],
    isLoading: false,
    error: company ? null : new Error('Company not found'),
    refetchUsers: () => {}, // No-op since we're using store data
  };
}