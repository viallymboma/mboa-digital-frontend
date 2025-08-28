"use client";
import React from 'react';

// import { useParams, usePathname } from 'next/navigation';
import GenericPageHeader
  from '@/app/(dashboard)/_components/_global/GenericPageHeader';
import MessageComponent
  from '@/app/(dashboard)/contacts/_component/MessageComponent';
import {
  AddMessageSvgIcon,
  AddNewContactSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { useContactStore } from '@/stores/contacts.store';
import { GroupType } from '@/types/groups';

import AddContactsToGroupForm
  from '../../_components/forms/AddContactsToGroupForm';

type OneGroupHeaderType = {
    currentGroup?: GroupType; // Define the type of currentGroup if known
};

const OneGroupHeader: React.FC <OneGroupHeaderType> = ({ currentGroup }) => {
    const [isAddContactsModalOpen, setIsAddContactsModalOpen] = React.useState(false);
    const { toggleModal } = useContactStore ();
    console.log('Current Group in isAddContactsModalOpen:', isAddContactsModalOpen);
    const buttons = [
        {
            label: 'group.groupMessage',
            icon: AddMessageSvgIcon, 
            dialoContentStyle: "sm:max-w-[500px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <>
                <MessageComponent />
            </>,
        },
        {
            label: '',
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-black", 
            // dialogContent: <CreateGroupForm />,
            dialogContent: <AddContactsToGroupForm
                group={currentGroup as GroupType} 
                onClose={() => setIsAddContactsModalOpen(false)} 
            />, 
            onclick: () => toggleModal(true),
        },
    ];

    const breadcrumbLinks = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Groups', href: '/groups' },
        { label: 'Contact' },
    ];

    return (
        <>
            {/* <GenericPageHeader buttons={buttons} title={`Group - ${ pathName?.split("/")[pathName?.split("/").length - 1] }`} breadcrumbLinks={breadcrumbLinks} /> */}
            <GenericPageHeader buttons={buttons} title={`Group - ${ currentGroup?.name }`} breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default OneGroupHeader