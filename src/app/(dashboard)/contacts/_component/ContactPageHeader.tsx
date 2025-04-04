"use client";
import React from 'react';

import {
  AddMessageSvgIcon,
  AddNewContactSvgIcon,
  ImporterContactSvgIcon,
} from '@/app/svg_components/SvgIcons';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';
import CreateContactForm from './CreateContactForm';
import ImportModule from './ImportModule';
import MessageComponent from './MessageComponent';

const ContactPageHeader = () => {

    const buttons = [
        {
            label: 'contact.newMessageBtn',
            icon: AddMessageSvgIcon, 
            dialoContentStyle: "sm:max-w-[500px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <>
                <MessageComponent />
            </>,
        },
        {
            label: 'contact.emptyUI.newContact',
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-black", 
            dialogContent: <CreateContactForm />,
        },
        {
            label: 'contact.importContactsBtn',
            icon: ImporterContactSvgIcon,
            dialoContentStyle: "sm:max-w-[571px] sm:h-[520px]", 
            buttonBg: "bg-black", 
            dialogContent: <div className='flex flex-col gap-[2rem]'><ImportModule /></div>,
        },
    ];

    const breadcrumbLinks = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Contact' },
    ];

    return (
        <>
            <GenericPageHeader buttons={buttons} title='Contacts' breadcrumbLinks={breadcrumbLinks} />
        </>
    )

}

export default ContactPageHeader