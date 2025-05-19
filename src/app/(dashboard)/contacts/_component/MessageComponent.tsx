"use client"
import React from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormTextArea } from '@/app/_components/form/FormInput';
import { Separator } from '@/components/ui/separator';
import { countCharacters } from '@/lib/utils';
import { useContactStore } from '@/stores/contacts.store';
import { zodResolver } from '@hookform/resolvers/zod';

import RecipientsSection from './table-sub-ui/RecipientsSection';

// import { EnterpriseContactResponseType } from '@/types/contact';

// Define schema validation using Zod
const schema = z.object({
    message: z.string().min(1, { message: 'Message is required' }),
    contactPhone: z.array(z.string()).min(1, { message: 'At least one item must be selected' }), // z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
});

type FormData = z.infer<typeof schema>;

const MessageComponent = () => {

    const { selectedContactsData } = useContactStore();
    console.log(selectedContactsData, "selectedContactsData in MessageComponent");

    const [charCount, setCharCount] = React.useState({ total: 0, special: 0, specialCount: 0 });

    const { t } = useTranslation();

    // Initialize react-hook-form with resolver
    const {
        handleSubmit,
        control,
        watch, 
        // formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            contactPhone: [], // Ensure this is initialized as an empty array
            message: '',      // Initialize other fields as needed
        },
    });

    // Watch the message field for changes
    const message = watch('message');
    
    // Update character count when message changes
    React.useEffect(() => {
        setCharCount(countCharacters(message));
    }, [message]);

    const onSubmit = (data: FormData) => {
        console.log('New Contact:', data);

        console.log(selectedContactsData)
    };
    return (
        <div className='max-h-[500px] p-1 overflow-y-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">

                {/* <Controller
                        name="contactPhone"
                        control={control}
                        rules={{ required: 'Phone is required' }}
                        render={({ field }) => (
                            <>
                                <MultiSelect
                                    label="Select Items"
                                    options={ selectedContactsData.length > 0 ? selectedContactsData : contacts }
                                    value={field?.value}
                                    onChange={field.onChange}
                                    error={errors.contactPhone?.message}
                                    onOpen={() => {
                                        if (selectedContactsData.length === 0) {
                                            setIsSelectionModalOpen(true);
                                        }
                                    }}
                                />
                                <BulkContactSelectionModal 
                                    isOpen={isSelectionModalOpen}
                                    onClose={() => setIsSelectionModalOpen(false)}
                                />
                            </>
                        )}
                    /> */}

                <RecipientsSection />

                <Separator />

                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                        <span className='text-[16px] text-grayText'>
                            {t('message.characterCount', { count: charCount.total })}
                        </span>
                        <span className='text-sm text-gray-500'>
                            SMS: {Math.ceil(charCount.total / 160)}
                        </span>
                    </div>
                    <span className='text-[16px] text-grayText'>
                        {t('message.specialCharacters', { count: charCount.special, weight: charCount.specialCount })}
                    </span>
                </div>

                <Separator />

                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => <FormTextArea label="Message" placeholder="Enter your message" {...field}  />}
                />

                <div className='flex flex-col gap-4'>
                    <button type="submit" className='flex flex-row rounded-lg justify-center gap-3 bg-primaryAppearance p-[1.5rem]'>
                        <span className='text-[18px] text-white'>{t('contact.sendMessageFormBtn')}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageComponent























// "use client"
// import React, { useState } from 'react';

// import {
//   Bold,
//   Image,
//   Italic,
//   Link,
//   Maximize2,
//   Minimize2,
//   Paperclip,
//   X,
// } from 'lucide-react';
// import {
//   Controller,
//   useForm,
// } from 'react-hook-form';
// // import { useTranslation } from 'react-i18next';
// import { z } from 'zod';

// import {
//   FormTextArea,
//   MultiSelect,
// } from '@/app/_components/form/FormInput';
// import { Button } from '@/components/ui/button';
// import { zodResolver } from '@hookform/resolvers/zod';

// const schema = z.object({
//     subject: z.string().min(1, { message: 'Subject is required' }),
//     message: z.string().min(1, { message: 'Message is required' }),
//     contactPhone: z.array(z.string()).min(1, { message: 'At least one recipient is required' }),
// });

// type FormData = z.infer<typeof schema>;

// const MessageComponent = () => {
//     const [isMinimized, setIsMinimized] = useState(false);
//     const [isMaximized, setIsMaximized] = useState(false);
//     // const { t } = useTranslation();

//     const {
//         handleSubmit,
//         control,
//         formState: { errors },
//     } = useForm<FormData>({
//         resolver: zodResolver(schema),
//         defaultValues: {
//             contactPhone: [],
//             subject: '',
//             message: '',
//         },
//     });

//     const options = [
//         { value: '3598u034t94jtj24kri29u4r948r', label: '695500474' },
//         { value: 'dbwg62t4r892483714y0r9284903', label: '694950434' },
//     ];

//     const onSubmit = (data: FormData) => {
//         console.log('Message Data:', data);
//     };

//     return (
//         <div className={`
//             fixed bottom-0 right-4 w-[600px] bg-white rounded-t-lg shadow-xl 
//             transition-all duration-200 ease-in-out
//             ${isMinimized ? 'h-[48px]' : isMaximized ? 'h-[90vh]' : 'h-[500px]'}
//         `}>
//             {/* Header */}
//             <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg">
//                 <h3 className="text-sm font-semibold">New Message</h3>
//                 <div className="flex items-center gap-2">
//                     <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setIsMinimized(!isMinimized)}
//                     >
//                         <Minimize2 className="h-4 w-4" />
//                     </Button>
//                     <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setIsMaximized(!isMaximized)}
//                     >
//                         <Maximize2 className="h-4 w-4" />
//                     </Button>
//                     <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => {/* Close handler */}}
//                     >
//                         <X className="h-4 w-4" />
//                     </Button>
//                 </div>
//             </div>

//             {/* Form */}
//             {!isMinimized && (
//                 <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-[calc(100%-48px)]">
//                     {/* Recipients */}
//                     <div className="flex items-center px-4 py-2 border-b">
//                         <span className="text-sm text-gray-500 w-16">To:</span>
//                         <Controller
//                             name="contactPhone"
//                             control={control}
//                             render={({ field }) => (
//                                 <MultiSelect
//                                     label=""
//                                     options={options}
//                                     value={field.value}
//                                     onChange={field.onChange}
//                                     error={errors.contactPhone?.message}
//                                     className="border-none flex-1"
//                                 />
//                             )}
//                         />
//                     </div>

//                     {/* Subject */}
//                     <div className="flex items-center px-4 py-2 border-b">
//                         <span className="text-sm text-gray-500 w-16">Subject:</span>
//                         <Controller
//                             name="subject"
//                             control={control}
//                             render={({ field }) => (
//                                 <input
//                                     {...field}
//                                     className="flex-1 outline-none text-sm"
//                                     placeholder="Subject"
//                                 />
//                             )}
//                         />
//                     </div>

//                     {/* Message body */}
//                     <div className="flex-1 px-4 py-2">
//                         <Controller
//                             name="message"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormTextArea
//                                     {...field}
//                                     label=""
//                                     placeholder="Type your message here..."
//                                     className="h-full border-none resize-none"
//                                 />
//                             )}
//                         />
//                     </div>

//                     {/* Toolbar */}
//                     <div className="px-4 py-2 border-t flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                             <Button type="submit" className="bg-primaryAppearance text-white">
//                                 Send
//                             </Button>
//                             <div className="flex items-center gap-1">
//                                 <Button variant="ghost" size="sm">
//                                     <Bold className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="ghost" size="sm">
//                                     <Italic className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="ghost" size="sm">
//                                     <Link className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="ghost" size="sm">
//                                     <Image className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="ghost" size="sm">
//                                     {/* <EmojiHappy className="h-4 w-4" /> */}
//                                     <Italic className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="ghost" size="sm">
//                                     <Paperclip className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                         </div>
//                         <Button variant="ghost" size="sm">
//                             <X className="h-4 w-4" />
//                         </Button>
//                     </div>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default MessageComponent;































