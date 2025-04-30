"use client";

import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  FileDownloadSvgIcon,
  FileUploadSvgIcon,
} from '@/app/svg_components/SvgIcons';

// import { Card } from '@/components/ui/card';
import ButtonList from '../../_components/_global/ButtonList';
import CreateContactForm from './CreateContactForm';
import MessageComponent from './MessageComponent';

const ImportModule = () => {
    const buttons = [
        {
            label: 'Prévisualiser',
            // icon: AddMessageSvgIcon, 
            dialoContentStyle: "sm:max-w-[500px]", 
            buttonBg: "bg-black text-[18px]", 
            dialogContent: <>
                <MessageComponent />
            </>,
        },
        {
            label: 'contact.emptyUI.newContact',
            // icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-primaryAppearance text-[18px]", 
            dialogContent: <CreateContactForm />,
        },
    ];
    const { t } = useTranslation();
    return (
        <div className='flex flex-col gap-[2rem]'>
            <div className='bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3'>
                <div>
                    <FileDownloadSvgIcon />
                </div>
                <div className='flex flex-row gap-3'>
                    <div className='flex flex-row gap-1'>
                        <h1 className='font-bold text-[20px]'>1</h1>
                        <h1 className='font-bold text-[20px]'>.</h1>
                    </div>
                    <div>
                        <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.downloadItem')}</h1>
                        <p>{t('contact.importContactForm.downloaItemDescription')}</p>
                    </div>
                </div>
            </div>
            <div className='bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3 '>
                <div className=''>
                    <FileUploadSvgIcon />
                </div>
                <div className='flex flex-row gap-3'>
                    <div className='flex flex-row gap-1'>
                        <h1 className='font-bold text-[20px]'>2</h1>
                        <h1 className='font-bold text-[20px]'>.</h1>
                    </div>
                    <div>
                        <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.uploadItem')}</h1>
                        <p>{t('contact.importContactForm.uploadItemDescription')}</p>
                    </div>
                </div>
            </div>
            {/* <Card className='bg-grayColor overflow-hidden'>
                <div className='flex flex-row items-center p-4 gap-3'>
                    <div>
                        <FileDownloadSvgIcon />
                    </div>
                    <div className='flex flex-row gap-3'>
                        <div className='flex flex-row gap-1'>
                            <h1 className='font-bold text-[20px]'>1</h1>
                            <h1 className='font-bold text-[20px]'>.</h1>
                        </div>
                        <div>
                            <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.downloadItem')}</h1>
                            <p>{t('contact.importContactForm.downloaItemDescription')}</p>
                        </div>
                    </div>
                </div>
            </Card>
            <Card className='flex items-center  bg-grayColor overflow-y-hidden'>
                <div className='flex flex-row items-center p-4 gap-3 '>
                    <div className=''>
                        <FileUploadSvgIcon />
                    </div>
                    <div className='flex flex-row gap-3'>
                        <div className='flex flex-row gap-1'>
                            <h1 className='font-bold text-[20px]'>2</h1>
                            <h1 className='font-bold text-[20px]'>.</h1>
                        </div>
                        <div>
                            <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.uploadItem')}</h1>
                            <p>{t('contact.importContactForm.uploadItemDescription')}</p>
                        </div>
                    </div>
                </div>
            </Card> */}
            <div className='flex flex-row gap-3 w-full'>

                <ButtonList buttons={buttons} />
                {/* <Button className='bg-black p-[2rem] w-[50%]'>
                    <ImporterContactSvgIcon />
                    <span className='text-[18px] text-white'>Prévisualiser</span>
                </Button>
                <Button className='bg-primaryAppearance p-[2rem] w-[50%]'>
                    <AddNewContactSvgIcon />
                    <span className='text-[18px] text-white'>{t('contact.contactForm.buttonLabel')}</span>
                </Button> */}
            </div>
        </div>
    )
}

export default ImportModule