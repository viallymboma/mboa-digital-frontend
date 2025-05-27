"use client";
import React from 'react';

// import { useParams, usePathname } from 'next/navigation';
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
import { GroupType } from '@/types/groups';

type OneGroupHeaderType = {
    currentGroup?: GroupType; // Define the type of currentGroup if known
};

const OneGroupHeader: React.FC <OneGroupHeaderType> = ({ currentGroup }) => {
    // const pathName = usePathname ()
    // const { id } = useParams ()
    // const currentGroup = React.useMemo(() => 
    //   groups?.find(group => group.id === id),
    //   [groups, id]
    // );
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
            {/* <GenericPageHeader buttons={buttons} title={`Group - ${ pathName?.split("/")[pathName?.split("/").length - 1] }`} breadcrumbLinks={breadcrumbLinks} /> */}
            <GenericPageHeader buttons={buttons} title={`Group - ${ currentGroup?.name }`} breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default OneGroupHeader