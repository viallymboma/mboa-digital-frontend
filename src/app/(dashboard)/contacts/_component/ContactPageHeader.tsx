"use client";
import React from 'react';

import { useTranslations } from 'next-intl';

import {
  AddMessageSvgIcon,
  AddNewContactSvgIcon,
  ImporterContactSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { useContacts } from '@/hooks/useContacts';
import { useContactStore } from '@/stores/contacts.store';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';
import CreateContactForm from './CreateContactForm';
import ImportModule from './ImportModule';
import MessageComponent from './MessageComponent';

const ContactPageHeader = () => {
    const t = useTranslations('contact');
    const { toggleModal, isModalOpend } = useContactStore();
    const { contacts } = useContacts();

    const buttons = [
        {
            label: t('newMessageBtn'),
            icon: AddMessageSvgIcon, 
            dialoContentStyle: "sm:max-w-[500px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <>
                <MessageComponent />
            </>,
        },
        {
            label: t('emptyUI.newContact'),
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-black", 
            dialogContent: <CreateContactForm />,
            isModalOpend,
            onClick: () => toggleModal(undefined as unknown as boolean),
        },
        {
            label: t('importContactsBtn'),
            icon: ImporterContactSvgIcon,
            dialoContentStyle: "sm:max-w-[571px] sm:h-[520px]", 
            buttonBg: "bg-black", 
            dialogContent: <div className='flex flex-col gap-[2rem]'><ImportModule /></div>,
        },
    ];

    const breadcrumbLinks = [
        { label: t('breadcrumb.dashboard'), href: '/dashboard' },
        { label: t('breadcrumb.contact') },
    ];

    return (
        <>
            <GenericPageHeader data={contacts} buttons={buttons} title={t('pageTitle')} breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default ContactPageHeader
