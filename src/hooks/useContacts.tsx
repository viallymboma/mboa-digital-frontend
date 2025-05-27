import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { notify } from '@/components/utilities/helper';
import { ContactService } from '@/services/contact.serivce';
import { ApiService } from '@/services/data.service';
import { useContactStore } from '@/stores/contacts.store';
import {
  CreateContactRequestType,
  EnterpriseContactResponseType,
  UpdateContactRequestType,
} from '@/types/contact';

// import { useUser } from './useAuth.hook';
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

export function useContacts() {

    const { getLocalStorage } = useGetLocalStorage();
    const { setContacts, addContact, updateContact, removeContact } = useContactStore();

    // GET CONTACTS MUTATION
    const { data, error, isLoading, mutate } = useSWR<EnterpriseContactResponseType[]>(
        'contacts',
        async () => {
            const service = ContactService.getInstance();
            const contacts = await service.getContactsByCompanyPaginated(getLocalStorage("user")?.enterprise?.id);
            console.log('Fetched contacts:', contacts);
            setContacts(contacts);
            return contacts;
        }
    );

    // CREATE CONTACT MUTATION
    const { trigger, isMutating, error: createContactError } = useSWRMutation(
        '/api/v1/contact',
        createContactFetcher,
        {
            onSuccess: (data: EnterpriseContactResponseType) => {
                // Add the new contact to the Zustand store
                console.log('Contact created successfully:', data);
                if (data) {
                    addContact(data);
                }
                
                // Update localStorage if needed
                const user = getLocalStorage("user");
                if (user) {
                    localStorage.setItem('user', JSON.stringify({
                        ...user,
                        enterprise: data?.enterprise
                    }));
                }
            },
        }
    );

    // Update mutation
    const { trigger: updateTrigger, isMutating: isUpdating, error: updateError } = useSWRMutation(
        `/api/v1/contact/${ getLocalStorage("user").id }`,
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

    // Delete mutation
    const { trigger: deleteTrigger, isMutating: isDeleting, error: deleteError } = useSWRMutation(
        `/api/v1/contact`,
        deleteContactFetcher,
        {
            onSuccess: (_, contactId) => {
                removeContact(contactId);
                notify.success('Contact deleted successfully');
            },
        }
    );

    // Function to create a new contact and trigger the mutation
    const createContact = async (data: CreateContactRequestType) => {
        try {
            await trigger(data);
        } catch (err) {
            console.error('Login failed:', err);
            notify.error('Failed to create contact');
            throw err;
        }
    };

    const editContact = async (data: UpdateContactRequestType) => {
        try {
            await updateTrigger(data); 
            // refetchEnterpriseContactsInStore ()
        } catch (err) {
            console.error('Update contact failed:', err);
            notify.error('Failed to update contact');
            throw err;
        }
    };

    const deleteContact = async (contactId: string) => {
        try {
            await deleteTrigger(contactId); 
            refetchEnterpriseContactsInStore ()
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
            // formData.append('enterpriseId', getLocalStorage("user")?.enterprise?.id);

            const service = ContactService.getInstance();
            const response = await service.importContacts(formData);
            
            // if (response.importedCount > 0) {
            //     notify.success(`Successfully imported ${response.importedCount} contacts`);
            //     await refetchEnterpriseContactsInStore();
            // }

            // if (response.failedCount > 0) {
            //     notify.warning(`Failed to import ${response.failedCount} contacts`);
            // }

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
        await mutate(); // Revalidates the SWR cache
    };

    return {
        contacts: data,
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