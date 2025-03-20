"use client";
import React from 'react';

// import { useTranslation } from 'react-i18next';
import {
  AddNewContactSvgIcon,
  ContactEmptyUISvgIcon,
  ImporterContactSvgIcon,
} from '@/app/svg_components/SvgIcons';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import ContactTableModule from './ContactTableModule';
import CreateContactForm from './CreateContactForm';
import ImportModule from './ImportModule';

// import EmptyStateUI from './EmptyStateUI';

const ContactModule = () => {
//   const { t } = useTranslation();

    const buttons = [
        {
            label: 'contact.emptyUI.newContact',
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <CreateContactForm />,
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

    return (
        <>
            <ContactTableModule />
            <EmptyStateUI
                SvgIcon={ContactEmptyUISvgIcon}
                mainTitle="contact.emptyUI.mainTitle"
                secondTitle="contact.emptyUI.secondTitle"
                buttons={buttons}
            />
        </>
    );
};

export default ContactModule;
















// "use client";
// import React from 'react';

// import { useTranslation } from 'react-i18next';

// import {
//   AddNewContactSvgIcon,
//   ContactEmptyUISvgIcon,
//   FileDownloadSvgIcon,
//   FileUploadSvgIcon,
//   ImporterContactSvgIcon,
// } from '@/app/svg_components/SvgIcons';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';

// import CreateContactForm from './CreateContactForm';

// const ContactModule = () => {
//     const { t } = useTranslation();
//     return (
//         <>
//             <ContactEmptyUISvgIcon />
//             <div className='w-[30%] text-center'>
//                 <h1 className='text-[34px] font-bold'>{t('contact.emptyUI.mainTitle')}</h1>
//             </div>
//             <div className='w-[20%] text-center mt-1'>
//                 <p className='text-[18px]'>{t('contact.emptyUI.secondTitle')}</p>
//             </div>
//             <div className='mt-5 flex flex-row gap-4'>
//                 <Dialog>
//                     <DialogTrigger asChild>
//                         <Button className='bg-primaryAppearance p-[1.5rem]'>
//                             <AddNewContactSvgIcon />
//                             <span className='text-[18px] text-white'>{t('contact.emptyUI.newContact')}</span>
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                             <DialogTitle className='text-[28px]'>{t('contact.addNewContactForm.title')}</DialogTitle>
//                             <DialogDescription>
//                                 {/* Make changes to your profile here. Click save when you're done. */}
//                             </DialogDescription>

//                         </DialogHeader>
//                         <CreateContactForm />

//                         {/* <Button className='bg-primaryAppearance p-[2rem]'>
//                             <AddNewContactSvgIcon />
//                             <span className='text-[18px] text-white'>Nouveau Contact</span>
//                         </Button> */}
//                     </DialogContent>
//                 </Dialog>
//                 <Dialog>
//                     <DialogTrigger asChild>
//                         <Button className='bg-black p-[1.5rem]'>
//                             <ImporterContactSvgIcon />
//                             <span className='text-[18px] text-white'>{t('contact.importContactsBtn')}</span>
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[571px] sm:h-[520px]">
//                         <DialogHeader>
//                             <DialogTitle className='text-[28px]'>{t('contact.emptyUI.importContact')}</DialogTitle>
//                             <DialogDescription>
//                                 {/* Make changes to your profile here. Click save when you're done. */}
//                             </DialogDescription>

//                         </DialogHeader>
//                         <div className='flex flex-col gap-[2rem]'>
//                             <Card className='bg-grayColor overflow-hidden'>
//                                 <div className='flex flex-row items-center p-4 gap-3'>
//                                     <div>
//                                         <FileDownloadSvgIcon />
//                                     </div>
//                                     <div className='flex flex-row gap-3'>
//                                         <div className='flex flex-row gap-1'>
//                                             <h1 className='font-bold text-[20px]'>1</h1>
//                                             <h1 className='font-bold text-[20px]'>.</h1>
//                                         </div>
//                                         <div>
//                                             <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.downloadItem')}</h1>
//                                             <p>{t('contact.importContactForm.downloaItemDescription')}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Card>
//                             <Card className='flex items-center  bg-grayColor overflow-y-hidden'>
//                                 <div className='flex flex-row items-center p-4 gap-3 '>
//                                     <div className=''>
//                                         <FileUploadSvgIcon />
//                                     </div>
//                                     <div className='flex flex-row gap-3'>
//                                         <div className='flex flex-row gap-1'>
//                                             <h1 className='font-bold text-[20px]'>2</h1>
//                                             <h1 className='font-bold text-[20px]'>.</h1>
//                                         </div>
//                                         <div>
//                                             <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.uploadItem')}</h1>
//                                             <p>{t('contact.importContactForm.uploadItemDescription')}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Card>
//                             <div className='flex flex-row gap-3 w-full'>
//                                 <Button className='bg-black p-[2rem] w-[50%]'>
//                                     <ImporterContactSvgIcon />
//                                     <span className='text-[18px] text-white'>Prévisualiser</span>
//                                 </Button>
//                                 <Button className='bg-primaryAppearance p-[2rem] w-[50%]'>
//                                     <AddNewContactSvgIcon />
//                                     <span className='text-[18px] text-white'>{t('contact.contactForm.buttonLabel')}</span>
//                                 </Button>
//                             </div>
//                         </div>

//                         {/* <Button className='bg-primaryAppearance p-[2rem]'>
//                             <AddNewContactSvgIcon />
//                             <span className='text-[18px] text-white'>Nouveau Contact</span>
//                         </Button> */}
//                     </DialogContent>
//                 </Dialog>
//             </div>
//         </>
//     )
// }

// export default ContactModule