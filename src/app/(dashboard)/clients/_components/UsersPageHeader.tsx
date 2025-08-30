"use client";
import React from 'react';

import { AddNewContactSvgIcon } from '@/app/svg_components/SvgIcons';
import { useClients } from '@/hooks/useClients';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';
import CreateClientForm from './form/CreateClientForm';

const UsersPageHeader = () => {
    const { clients } = useClients();
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
            label: 'Creer nouvel utilisateur',
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[625px]", 
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
            <GenericPageHeader data={clients} buttons={buttons} title='Clients' breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default UsersPageHeader