"use client"
import React from 'react';

import { useTranslations } from 'next-intl';
import {
  Controller,
  useForm,
} from 'react-hook-form';
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

const schema = z.object({
    message: z.string().min(1, { message: 'message.validation.messageRequired' }),
});

type FormData = z.infer<typeof schema>;

const MessageComponent = () => {
    const t = useTranslations();
    const { selectedContactsData } = useContactStore();
    const { sendMessage } = useMessages();
    const [charCount, setCharCount] = React.useState({ total: 0, special: 0, specialCount: 0 });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const message = watch('message');
    
    React.useEffect(() => {
        setCharCount(countCharacters(message));
    }, [message]);

    const onSubmit = async (data: FormData) => {
        if (selectedContactsData.length === 0) {
            notify.error(t('message.validation.noRecipients'));
            return;
        }

        try {
            setIsSubmitting(true);
            const contacts = selectedContactsData.map(contact => contact.phoneNumber);
            await sendMessage(data.message, contacts);
            notify.success(t('message.success'));
            reset();
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
                            {/* {t('message.characterCount', { count: charCount.total })} */}
                            {t('message.characterCount')}  { charCount.total }
                        </span>
                        <span className='text-sm text-gray-500'>
                            {/* {t('message.smsCount', { count: Math.ceil(charCount.total / 160) })} */}
                            {t('message.smsCount')} { Math.ceil(charCount.total / 160) }
                        </span>
                    </div>
                    <span className='text-[16px] text-grayText'>
                        {/* {t('message.specialCharacters', { count: charCount.special, weight: charCount.specialCount })} */}
                        { t('message.specialCharacters') }  { charCount.special } {' => '} { charCount.specialCount }
                    </span>
                </div>
                <Separator />
                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                        <FormTextArea 
                            {...field}  
                            label={t('message.form.label')} 
                            placeholder={t('message.form.placeholder')} 
                            error={errors.message?.message ? t(errors.message.message) : undefined}
                        />
                    )}
                />
                <div className='flex flex-col gap-4'>
                    <FormButton className='bg-primaryAppearance h-[56px] text-white' type="submit">{ isSubmitting ? t('message.form.submitting') : t('contact.sendMessageFormBtn') }</FormButton>
                </div>
            </form>
        </div>
    )
}

export default MessageComponent
