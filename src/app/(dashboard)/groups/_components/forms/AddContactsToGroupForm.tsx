"use client"
import React from 'react';

import RecipientsSection
  from '@/app/(dashboard)/contacts/_component/table-sub-ui/RecipientsSection';
// import { RecipientsSection } from '@/app/(dashboard)/contacts/_component/table-sub-ui/RecipientsSection';
import { FormButton } from '@/app/_components/form/FormButton';
import { Separator } from '@/components/ui/separator';
import { notify } from '@/components/utilities/helper';
import { useGroups } from '@/hooks/useGroupOps';
import { useContactStore } from '@/stores/contacts.store';
import { GroupType } from '@/types/groups';

interface AddContactsToGroupFormProps {
    group: GroupType;
    onClose?: () => void;
}

const AddContactsToGroupForm: React.FC<AddContactsToGroupFormProps> = ({ group, onClose }) => {
    console.log('Group in AddContactsToGroupForm:', onClose);
    const { addContactsToGroup } = useGroups();
    // const { toggleAddContactToGroupModal } = useGroupStore();
    
    const { selectedContactsData, toggleModal } = useContactStore();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedContactsData.length === 0) {
            notify.error('Please select at least one contact');
            return;
        }

        try {
            setIsSubmitting(true);
            const contactIds = selectedContactsData.map(contact => contact.id);
            const removeAlreadySelectedContacts = group.enterpriseContacts?.map(contact => contact.id) || [];
            const filteredContactIds = contactIds.filter(id => !removeAlreadySelectedContacts.includes(id));
            await addContactsToGroup(group.id, filteredContactIds);
            // onClose();
            toggleModal(false);
            // toggleModal(undefined as unknown as boolean); // Close the modal
        } catch (error) {
            console.error('Error adding contacts to group:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit (e)} className="space-y-4 flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Add Contacts to {group.name}</h3>
            <Separator />
            <RecipientsSection />
            <div className='flex flex-col gap-4'>
                <FormButton 
                    className='bg-primaryAppearance h-[56px] text-white' 
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding...' : 'Add Selected Contacts'}
                </FormButton>
            </div>
        </form>
    );
};

export default AddContactsToGroupForm;