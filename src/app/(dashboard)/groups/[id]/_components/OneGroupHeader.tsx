"use client";
import React from 'react';

import { useTranslations } from 'next-intl';

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
    currentGroup?: GroupType;
};

const OneGroupHeader: React.FC <OneGroupHeaderType> = ({ currentGroup }) => {
    const t = useTranslations('group');
    const [isAddContactsModalOpen, setIsAddContactsModalOpen] = React.useState(false);
    const { toggleModal } = useContactStore();
    console.log('Current Group in isAddContactsModalOpen:', isAddContactsModalOpen);
    const buttons = [
        {
            label: t('groupMessage'),
            icon: AddMessageSvgIcon, 
            dialoContentStyle: "sm:max-w-[500px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <>
                <MessageComponent />
            </>,
        },
        {
            label: t('module.addContactsButton'),
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-black", 
            dialogContent: <AddContactsToGroupForm
                group={currentGroup as GroupType} 
                onClose={() => setIsAddContactsModalOpen(false)} 
            />, 
            onclick: () => toggleModal(true),
        },
    ];

    const breadcrumbLinks = [
        { label: t('header.breadcrumb.dashboard'), href: '/dashboard' },
        { label: t('headerGroupOne.breadcrumb.groups'), href: '/groups' },
        { label: t('headerGroupOne.breadcrumb.contact') },
    ];

    return (
        <>
            <GenericPageHeader 
                data={currentGroup?.enterpriseContacts} 
                buttons={buttons} 
                title={t('headerGroupOne.title') + (currentGroup?.name || '')} 
                // title={t('headerGroupOne.title', { name: currentGroup?.name || '' })} 
                // title={`Group - ${ currentGroup?.name }`}
                breadcrumbLinks={breadcrumbLinks} 
            />
        </>
    )
}

export default OneGroupHeader
