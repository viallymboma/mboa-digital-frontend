'use client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { notify } from '@/components/utilities/helper';
import { CompanyService } from '@/services/CompanyService';
import { ContactService } from '@/services/contact.serivce';
import { ApiService } from '@/services/data.service';
import { useContactStore } from '@/stores/contacts.store';
import {
  CreateContactRequestType,
  EnterpriseContactResponseType,
  UpdateContactRequestType,
} from '@/types/contact';

import useGetLocalStorage from './useGetLocalStorage';

async function createContactFetcher(url: string, { arg }: { arg: CreateContactRequestType }) {
  const apiService = ApiService.getInstance();
  return apiService.post<EnterpriseContactResponseType, CreateContactRequestType>(url, arg);
}

async function updateContactFetcher(url: string, { arg }: { arg: UpdateContactRequestType }) {
  const apiService = ApiService.getInstance();
  return apiService.put<EnterpriseContactResponseType, UpdateContactRequestType>(`${url}/${arg.id}`, arg);
}

async function deleteContactFetcher(url: string, { arg }: { arg: string }) {
  const apiService = ApiService.getInstance();
  return apiService.delete(`${url}/${arg}`);
}

async function getCompanyContactsFetcher(_: string, { arg }: { arg: { enterpriseId: string, role: string } }) {
  const companyService = CompanyService.getInstance();
  return companyService.getCompanyContacts(arg.enterpriseId, arg.role);
}

export function useContacts(enterpriseId?: string) {
  const { getLocalStorage } = useGetLocalStorage();
  const { setContacts, addContact, updateContact, removeContact } = useContactStore();
  const user = getLocalStorage('user');
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  // Determine the endpoint based on user role and enterpriseId
  const key = isSuperAdmin && enterpriseId ? `contacts/${enterpriseId}` : `contacts/${user?.enterprise?.id || ''}`;

  // GET CONTACTS 
  
  const { data, error, isLoading, mutate } = useSWR<EnterpriseContactResponseType[]>(
    enterpriseId || user?.enterprise?.id ? key : null,
    () => getCompanyContactsFetcher(key, { arg: { enterpriseId: enterpriseId || user?.enterprise?.id || '', role: user?.role } }),
    {
      onSuccess: (contacts) => {
        setContacts(contacts || []);
      },
    }
  );

  // CREATE CONTACT MUTATION
  const { trigger, isMutating, error: createContactError } = useSWRMutation(
    '/api/v1/contact',
    createContactFetcher,
    {
      onSuccess: (data: EnterpriseContactResponseType) => {
        console.log('Contact created successfully:', data);
        if (data) {
          addContact(data);
        }
        const user = getLocalStorage('user');
        if (user) {
          localStorage.setItem('user', JSON.stringify({
            ...user,
            enterprise: data?.enterprise,
          }));
        }
      },
    }
  );

  // UPDATE CONTACT MUTATION
  const { trigger: updateTrigger, isMutating: isUpdating, error: updateError } = useSWRMutation(
    '/api/v1/contact',
    updateContactFetcher,
    {
      onSuccess: (data: EnterpriseContactResponseType) => {
        if (data) {
          updateContact(data);
          notify.success('Contact updated successfully');
        }
      },
    }
  );

  // DELETE CONTACT MUTATION
  const { trigger: deleteTrigger, isMutating: isDeleting, error: deleteError } = useSWRMutation(
    '/api/v1/contact',
    deleteContactFetcher,
    {
      onSuccess: (_, contactId) => {
        removeContact(contactId);
        notify.success('Contact deleted successfully');
      },
    }
  );

  const createContact = async (data: CreateContactRequestType) => {
    try {
      await trigger(data);
    } catch (err) {
      console.error('Create contact failed:', err);
      notify.error('Failed to create contact');
      throw err;
    }
  };

  const editContact = async (data: UpdateContactRequestType) => {
    try {
      await updateTrigger(data);
      await refetchEnterpriseContactsInStore();
    } catch (err) {
      console.error('Update contact failed:', err);
      notify.error('Failed to update contact');
      throw err;
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      await deleteTrigger(contactId);
      await refetchEnterpriseContactsInStore();
    } catch (err) {
      console.error('Delete contact failed:', err);
      notify.error('Failed to delete contact');
      throw err;
    }
  };

  const importContacts = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const service = ContactService.getInstance();
      const response = await service.importContacts(formData);
      notify.success('Contacts imported successfully');
      await refetchEnterpriseContactsInStore();
      return response;
    } catch (error) {
      console.error('Import failed:', error);
      notify.error('Failed to import contacts');
      throw error;
    }
  };

  const downloadTemplate = async () => {
    try {
      const service = ContactService.getInstance();
      const blob = await service.downloadTemplate();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contact_import_template.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      notify.error('Failed to download template');
      throw error;
    }
  };

  const refetchEnterpriseContactsInStore = async () => {
    await mutate();
  };

  return {
    contacts: data || [],
    isLoading,
    error,
    createContactError,
    isMutating,
    createContact,
    mutate,
    refetchEnterpriseContactsInStore,
    editContact,
    deleteContact,
    importContacts,
    downloadTemplate,
    isUpdating,
    isDeleting,
    updateError,
    deleteError,
  };
}
