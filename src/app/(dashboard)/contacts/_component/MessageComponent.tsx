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

// Define schema validation using Zod
const schema = z.object({
    message: z.string().min(1, { message: 'Message is required' }),
    contactPhone: z.array(z.string()).min(1, { message: 'At least one item must be selected' }), // z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
});

type FormData = z.infer<typeof schema>;

const MessageComponent = () => {
    const { selectedContactsData } = useContactStore();
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