"use client";
import React from 'react';

import { usePathname } from 'next/navigation';

import GenericPageHeader
  from '@/app/(dashboard)/_components/_global/GenericPageHeader';
import CreateContactForm
  from '@/app/(dashboard)/contacts/_component/CreateContactForm';
import ImportModule from '@/app/(dashboard)/contacts/_component/ImportModule';
import MessageComponent
  from '@/app/(dashboard)/contacts/_component/MessageComponent';
import {
  AddMessageSvgIcon,
  AddNewContactSvgIcon,
  ImporterContactSvgIcon,
} from '@/app/svg_components/SvgIcons';

// import GenericPageHeader from '../../_components/_global/GenericPageHeader';
// import CreateContactForm from '../../contacts/_component/CreateContactForm';
// import MessageComponent from '../../contacts/_component/MessageComponent';

const OneEtablissementHeader = () => {
    const pathName = usePathname ()
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
        { label: 'Etablissements', href: '/etablissements' },
        { label: 'Etablissement' },
    ];

    return (
        <>
            <GenericPageHeader buttons={buttons} title={`Group - ${ pathName?.split("/")[pathName?.split("/").length - 1] }`} breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default OneEtablissementHeader

// clipRule