"use client";
import React from 'react';

import { usePathname } from 'next/navigation';

import GenericPageHeader
  from '@/app/(dashboard)/_components/_global/GenericPageHeader';
import CreateContactForm
  from '@/app/(dashboard)/contacts/_component/CreateContactForm';
import MessageComponent
  from '@/app/(dashboard)/contacts/_component/MessageComponent';
import {
  AddMessageSvgIcon,
  AddNewContactSvgIcon,
} from '@/app/svg_components/SvgIcons';

// import GenericPageHeader from '../../_components/_global/GenericPageHeader';
// import CreateContactForm from '../../contacts/_component/CreateContactForm';
// import MessageComponent from '../../contacts/_component/MessageComponent';

const OneGroupHeader = () => {
    const pathName = usePathname ()
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
            dialogContent: <CreateContactForm />,
        },
    ];

    const breadcrumbLinks = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Groups', href: '/groups' },
        { label: 'Contact' },
    ];

    return (
        <>
            <GenericPageHeader buttons={buttons} title={`Group - ${ pathName?.split("/")[pathName?.split("/").length - 1] }`} breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default OneGroupHeader

// clipRule