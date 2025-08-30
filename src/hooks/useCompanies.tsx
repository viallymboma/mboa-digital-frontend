'use client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { notify } from '@/components/utilities/helper';
import { CompanyService } from '@/services/CompanyService';
import { useCompanyStore } from '@/stores/useContactStore';
import {
  AddUserToEnterpriseRequestType,
  CreateCompanyRequestType,
  EnterpriseType,
} from '@/types/company';
import { EnterpriseContactResponseType } from '@/types/contact';

import useGetLocalStorage from './useGetLocalStorage';

async function createCompanyFetcher(url: string, { arg }: { arg: CreateCompanyRequestType }) {
  const companyService = CompanyService.getInstance();
  return companyService.createCompany(arg);
}

async function addUserFetcher(url: string, { arg }: { arg: { enterpriseId: string; user: AddUserToEnterpriseRequestType } }) {
  const companyService = CompanyService.getInstance();
  return companyService.addUserToEnterprise(arg.enterpriseId, arg.user);
}

async function updateCompanyFetcher(url: string, { arg }: { arg: { id: string; company: CreateCompanyRequestType } }) {
  const companyService = CompanyService.getInstance();
  return companyService.updateCompany(arg.id, arg.company);
}

async function getUpdatedCompanyInfoFetcher(url: string, { arg }: { arg: { id: string; } }) {
  const companyService = CompanyService.getInstance();
  return companyService.getUpdatedCompanyInfo(arg.id);
}

async function deleteCompanyFetcher(url: string, { arg }: { arg: string }) {
  const companyService = CompanyService.getInstance();
  return companyService.deleteCompany(arg);
}

async function getCompanyContactsFetcher(_: string, { arg }: { arg: { enterpriseId: string } }) {
  const companyService = CompanyService.getInstance();
  return companyService.getCompanyContacts(arg.enterpriseId, 'SUPER_ADMIN');
}


export function useCompanies(enterpriseId?: string) {
  const { getLocalStorage } = useGetLocalStorage();
  const { setCompanies, addCompany, updateCompany: updateCompanyInStore, removeCompany } = useCompanyStore();
  const user = getLocalStorage('user');
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  // Determine the endpoint key for contacts
  const contactKey = enterpriseId || user?.enterprise?.id ? `contacts/${enterpriseId || user?.enterprise?.id}` : null;
  // const companyInfoKey = enterpriseId || user?.enterprise?.id ? `contacts/${enterpriseId || user?.enterprise?.id}` : null;

  // Fetch companies based on user role
  const { data: companies, error: companyError, isLoading: companyIsLoading, mutate } = useSWR<EnterpriseType[]>(
    'companies',
    async () => {
      const service = CompanyService.getInstance();
      const companies = await service.getCompanies();
      const filteredCompanies = isSuperAdmin
        ? companies
        : companies.filter((company) => company.id === user?.enterprise?.id);
      setCompanies(filteredCompanies);
      return filteredCompanies;
    }
  );

  // Fetch company contacts
  const { data: companyContacts, error: companyContactError, isLoading: companyContactIsLoading } = useSWR<EnterpriseContactResponseType[]>(
    contactKey,
    () => getCompanyContactsFetcher(contactKey!, { arg: { enterpriseId: enterpriseId || user?.enterprise?.id || '' } }),
    {
      onSuccess: (contacts) => {
        console.log('Fetched company contacts:', contacts);
      },
    }
  );

  // Fetch company info updates
  const { data: companyFreshInfo, error: companyFreshInfoError, isLoading: companyFreshInfoIsLoading } = useSWR<EnterpriseContactResponseType[]>(
    // contactKey,
    `/api/v1/enterprise/${user?.id}`,
    () => getUpdatedCompanyInfoFetcher(contactKey!, { arg: { id: user?.id || '' } }),
    {
      onSuccess: (companyInfo) => {
        console.log('Fetched company info:', companyInfo);
      },
    }
  );

  console.log('companyFreshInfo in hook', companyFreshInfo);

  // Create company mutation
  const { trigger: createTrigger, isMutating: isCreating, error: createError } = useSWRMutation(
    '/api/v1/enterprise',
    createCompanyFetcher,
    {
      onSuccess: (data: EnterpriseType) => {
        addCompany(data);
        notify.success('Company created successfully');
      },
      onError: (err) => {
        console.error('Create company failed:', err);
        notify.error('Failed to create company');
      },
    }
  );

  // Add user to enterprise mutation
  const { trigger: addUserTrigger, isMutating: isAddingUser, error: addUserError } = useSWRMutation(
    '/api/v1/enterprise/adduser-enterprise',
    addUserFetcher,
    {
      onSuccess: () => {
        notify.success('User added to enterprise successfully');
        mutate();
      },
      onError: (err) => {
        console.error('Add user failed:', err);
        notify.error('Failed to add user to enterprise');
      },
    }
  );

  // Update company mutation
  const { trigger: updateTrigger } = useSWRMutation(
    '/api/v1/enterprise',
    updateCompanyFetcher,
    {
      onSuccess: (data: EnterpriseType) => {
        updateCompanyInStore(data);
        notify.success('Company updated successfully');
      },
      onError: (err) => {
        console.error('Update company failed:', err);
        notify.error('Failed to update company');
      },
    }
  );

  // Delete company mutation
  const { trigger: deleteTrigger } = useSWRMutation(
    '/api/v1/enterprise',
    deleteCompanyFetcher,
    {
      onSuccess: (_, id: string) => {
        removeCompany(id);
        notify.success('Company deleted successfully');
      },
      onError: (err) => {
        console.error('Delete company failed:', err);
        notify.error('Failed to delete company');
      },
    }
  );

  const createCompany = async (data: CreateCompanyRequestType) => {
    try {
      await createTrigger(data);
    } catch (err) {
      throw err;
    }
  };

  const addUserToEnterprise = async (enterpriseId: string, user: AddUserToEnterpriseRequestType) => {
    try {
      await addUserTrigger({ enterpriseId, user });
    } catch (err) {
      throw err;
    }
  };

  const updateCompany = async (data: { id: string; company: CreateCompanyRequestType }) => {
    try {
      await updateTrigger(data);
      await mutate();
    } catch (err) {
      throw err;
    }
  };

  const deleteCompany = async (id: string) => {
    try {
      await deleteTrigger(id);
      await mutate();
    } catch (err) {
      throw err;
    }
  };

  const refetchCompanies = async () => {
    await mutate();
  };

  return {
    companies: companies || [],
    isLoading: companyIsLoading,
    error: companyError,
    createError,
    isCreating,
    addUserError,
    isAddingUser,
    companyContacts: companyContacts || [],
    companyContactError,
    companyContactIsLoading,

    companyFreshInfo: companyFreshInfo || [],
    companyFreshInfoError,
    companyFreshInfoIsLoading,

    createCompany,
    addUserToEnterprise,
    updateCompany,
    deleteCompany,
    refetchCompanies,
  };
}
