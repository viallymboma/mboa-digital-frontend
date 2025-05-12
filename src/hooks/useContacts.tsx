import useSWR from 'swr';

import { ContactService } from '@/services/contact.serivce';
import { useContactStore } from '@/stores/contacts.store';
import { EnterpriseContactResponseType } from '@/types/contact';

export function useContacts() {
    const setContacts = useContactStore((state) => state.setContacts);
    
    const { data, error, isLoading, mutate } = useSWR<EnterpriseContactResponseType[]>(
        'contacts',
        async () => {
            const service = ContactService.getInstance();
            const contacts = await service.getContacts();
            setContacts(contacts);
            return contacts;
        }
    );

    const refetchEnterpriseContactsInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        contacts: data,
        isLoading,
        error,
        mutate, 
        refetchEnterpriseContactsInStore,
    };
}