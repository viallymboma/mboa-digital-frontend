"use client"
import React from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
  FormTextArea,
  MultiSelect,
} from '@/app/_components/form/FormInput';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';

// Define schema validation using Zod
const schema = z.object({
    message: z.string().min(1, { message: 'Message is required' }),
    contactPhone: z.array(z.string()).min(1, { message: 'At least one item must be selected' }), // z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
});

type FormData = z.infer<typeof schema>;

const MessageComponent = () => {

    const { t } = useTranslation();

    // Initialize react-hook-form with resolver
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            contactPhone: [], // Ensure this is initialized as an empty array
            message: '',      // Initialize other fields as needed
        },
    });

    const options = [
        { value: '3598u034t94jtj24kri29u4r948r', label: '695500474' },
        { value: 'dbwg62t4r892483714y0r9284903', label: '694950434' },
    ];

    const onSubmit = (data: FormData) => {
        console.log('New Contact:', data);
    };
    return (
        <div className='max-h-[500px] p-1 overflow-y-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">

                <div className='flex flex-row gap-4 items-center'>
                    <span>
                        à:
                    </span>
                    <Controller
                        name="contactPhone"
                        control={control}
                        // defaultValue=""
                        rules={{ required: 'Phone is required' }}
                        render={({ field }) => (
                            // <CountrySelect
                            //     {...field}
                            //     label=""
                            //     className='border-primaryAppearance'
                            //     options={options}
                            //     value={field.value}
                            //     onChange={field.onChange}
                            //     error={errors.contactPhone?.message} // Include error for country
                            // />
                            <MultiSelect
                                label="Select Items"
                                options={options}
                                value={field?.value}
                                onChange={field.onChange}
                                error={errors.contactPhone?.message}
                            />
                        )}
                    />
                </div>

                <Separator />

                <div className='flex flex-col gap-2'>
                    <span className='text-[16px] text-grayText'>
                        Nombre de caractères : 12
                    </span>
                    <span className='text-[16px] text-grayText'>
                        Nombre de caractères speciaux : 0
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
                        {/* <AddNewContactSvgIcon color="white" /> */}
                        <span className='text-[18px] text-white'>{t('contact.sendMessageFormBtn')}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageComponent