"use client";
import React from 'react';

import {
  AddNewContactSvgIcon,
  ContactEmptyUISvgIcon,
  ImporterContactSvgIcon,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { useClients } from '@/hooks/useClients';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import ImportModule from '../../contacts/_component/ImportModule';
import CreateClientForm from './form/CreateClientForm';
import ClientTableModule from './table/ClientTableModule';

const UsersModule = () => {
        const { clients, isLoading, error } = useClients();
    // const { selectedContactsData } = useContactStore();
    // console.log(selectedContactsData, "selectedContactsData in contact module");
    console.log(clients, "clients+++++++++++__________");

    const buttons = [
        {
            label: 'contact.emptyUI.newContact',
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <CreateClientForm onClose={() => (document.querySelector("button[aria-label='Close']") as HTMLButtonElement)?.click()} />,
        },
        {
            label: 'contact.importContactsBtn',
            icon: ImporterContactSvgIcon,
            dialoContentStyle: "sm:max-w-[571px] sm:h-[520px]", 
            buttonBg: "bg-black", 
            dialogContent: (
                <div className='flex flex-col gap-[2rem]'>
                    <ImportModule />
                </div>
            ),
        },
    ];

    if (isLoading) {
        return (<div className='relative flex items-center justify-center w-full h-screen'>
            <div className="absolute  m-auto w-[10rem] h-[10rem] animate-spin p-4 rounded-full  border-t-[10px]  border-t-purple-600 border-primaryAppearanceLight">
            </div>
            <div className='flex items-center justify-center w-[10rem] h-[10rem] rounded-full'>
                <SvgLogoIcon height='98' width='100' />
            </div>
        </div>)
    }

    if (error) {
        return (<div className='flex items-center justify-center w-full h-screen bg-white'>
                <div className="w-20 h-20 animate-spin p-4 rounded-full border-[10px] border-t-[10px]  border-t-blue-500 border-white">
                    error
                </div>
            </div>)
    }

    if (Array.isArray(clients) && clients.length === 0) {
        return (<EmptyStateUI
            SvgIcon={ContactEmptyUISvgIcon}
            mainTitle="contact.emptyUI.mainTitle"
            secondTitle="contact.emptyUI.secondTitle"
            buttons={buttons}
        />)
    }

    return (
        <>
            <ClientTableModule clients={ clients } />
        </>
    );
}

export default UsersModule