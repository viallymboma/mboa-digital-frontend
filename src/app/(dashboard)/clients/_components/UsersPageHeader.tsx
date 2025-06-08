"use client";
import React from 'react';

import { AddNewContactSvgIcon } from '@/app/svg_components/SvgIcons';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';
import CreateClientForm from './form/CreateClientForm';

const UsersPageHeader = () => {
    const buttons = [
        // {
        //     label: 'contact.newMessageBtn',
        //     icon: AddMessageSvgIcon, 
        //     dialoContentStyle: "sm:max-w-[500px]", 
        //     buttonBg: "bg-primaryAppearance", 
        //     dialogContent: <>
        //         <MessageComponent />
        //     </>,
        // },
        {
            label: 'Creer nouveau contact',
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-black", 
            dialogContent: <CreateClientForm />,
        },
        // {
        //     label: 'contact.importContactsBtn',
        //     icon: ImporterContactSvgIcon,
        //     dialoContentStyle: "sm:max-w-[571px] sm:h-[520px]", 
        //     buttonBg: "bg-black", 
        //     dialogContent: <div className='flex flex-col gap-[2rem]'><ImportModule /></div>,
        // },
    ];
    const breadcrumbLinks = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Clients' },
    ];
    return (
        <>
            <GenericPageHeader buttons={buttons} title='Clients' breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default UsersPageHeader