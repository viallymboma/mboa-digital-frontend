"use client";
import React from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormInput } from '@/app/_components/form/FormInput';
import { AddNewContactSvgIcon } from '@/app/svg_components/SvgIcons';
import { zodResolver } from '@hookform/resolvers/zod';

// Define schema validation using Zod
const schema = z.object({
    fullName: z.string().min(1, { message: 'Full name is required' }),
    contactPhone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
    city: z.string().min(1, { message: 'City is required' })
});

type FormData = z.infer<typeof schema>;

const CreateContactForm = () => {
    const { t } = useTranslation();

    // Initialize react-hook-form with resolver
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log('New Contact:', data);
    };

    return (
        <div className='max-h-[500px] overflow-y-auto p-2'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
                <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            className='border-primaryAppearance'
                            // label={t('contact.contactForm.fullName')}
                            label=""
                            placeholder={t('contact.contactForm.fullNamePlaceHolder')}
                            error={errors.fullName?.message}
                        />
                    )}
                />

                <Controller
                    name="contactPhone"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            className='border-primaryAppearance' 
                            type="number"
                            // label={t('contact.contactForm.phoneNumber')}
                            label=""
                            placeholder={t('contact.contactForm.phoneNumberPlaceHolder')}
                            error={errors.contactPhone?.message}
                        />
                    )}
                />

                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            className='border-primaryAppearance' 
                            // label={t('contact.contactForm.city')}
                            label=""
                            placeholder={t('contact.contactForm.cityPlaceHolder')}
                            error={errors.city?.message}
                        />
                    )}
                />

                <div className='flex flex-col gap-4'>
                    <button type="submit" className='flex flex-row rounded-lg justify-center gap-3 bg-primaryAppearance p-[1.5rem]'>
                        <AddNewContactSvgIcon color="white" />
                        <span className='text-[18px] text-white'>{t('contact.contactForm.buttonLabel')}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateContactForm;




