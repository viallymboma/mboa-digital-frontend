"use client";
import React from 'react';

import {
  AddMessageSvgIcon,
  AddNewContactSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { useGroups } from '@/hooks/useGroupOps';
import { useGroupStore } from '@/stores/groups.store';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';
// import CreateContactForm from '../../contacts/_component/CreateContactForm';
import MessageComponent from '../../contacts/_component/MessageComponent';
import CreateGroupForm from './forms/CreateGroupForm';

const GroupHeader = () => {
    const { isCreateGroupModalOpen, toggleCreateGroupModal } = useGroupStore ();
    const { groups } = useGroups();
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
            label: 'group.newGroupBtn',
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-black", 
            dialogContent: <CreateGroupForm />,
            isModalOpend: isCreateGroupModalOpen,
            onclick: () => toggleCreateGroupModal(undefined as unknown as boolean),
        },
    ];

    const breadcrumbLinks = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Groupe' },
    ];

    return (
        <>
            <GenericPageHeader data={groups} buttons={buttons} title='Mes Groupes' breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default GroupHeader