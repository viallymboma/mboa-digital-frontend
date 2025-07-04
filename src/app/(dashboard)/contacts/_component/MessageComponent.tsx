"use client"
import React from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormButton } from '@/app/_components/form/FormButton';
import { FormTextArea } from '@/app/_components/form/FormInput';
import { Separator } from '@/components/ui/separator';
import { notify } from '@/components/utilities/helper';
import { useMessages } from '@/hooks/useMessage';
import { countCharacters } from '@/lib/utils';
import { useContactStore } from '@/stores/contacts.store';
import { zodResolver } from '@hookform/resolvers/zod';

import RecipientsSection from './table-sub-ui/RecipientsSection';

// Define schema validation using Zod
const schema = z.object({
    message: z.string().min(1, { message: 'Message is required' }),
    // contactPhone: z.array(z.string()).min(1, { message: 'At least one item must be selected' }), // z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
});

type FormData = z.infer<typeof schema>;

const MessageComponent = () => {
    const { selectedContactsData } = useContactStore();
    const { sendMessage, messages } = useMessages();
    const [charCount, setCharCount] = React.useState({ total: 0, special: 0, specialCount: 0 });
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    console.log(messages, "89347984792482049")

    // Initialize react-hook-form with resolver
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors }, // Add this
        reset // Add this for form reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // Watch the message field for changes
    const message = watch('message');
    
    // Update character count when message changes
    React.useEffect(() => {
        setCharCount(countCharacters(message));
    }, [message]);



    const onSubmit = async (data: FormData) => {
        console.log('New Message:', data);
        console.log(selectedContactsData)

        // return

        if (selectedContactsData.length === 0) {
            notify.error('Please select at least one recipient');
            return;
        }

        try {
            setIsSubmitting(true);
            const contacts = selectedContactsData.map(contact => contact.phoneNumber);
            await sendMessage(data.message, contacts);
            notify.success('Message sent successfully');
            reset(); // Reset form after successful submission
        } catch (error) {
            console.error('Error sending message:', error);
            if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                // @ts-expect-error: dynamic error shape
                notify.error(error.response.data.message);
                console.error('Error sending message:', error.response.data.message);
            }
            return;
        } finally {
            setIsSubmitting(false);
            // notify.dismiss();
        }
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
                    render={({ field }) => (
                        <FormTextArea 
                            {...field}  
                            label="Message" 
                            placeholder="Enter your message" 
                            error={errors.message?.message}
                        />
                    )}
                />


                <div className='flex flex-col gap-4'>
                    <FormButton className='bg-primaryAppearance h-[56px] text-white' type="submit">{ isSubmitting ? 'Sending...' : t('contact.sendMessageFormBtn') }</FormButton>
                </div>
            </form>
        </div>
    )
}

export default MessageComponent