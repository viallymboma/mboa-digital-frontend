"use client";
import React from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormButton } from '@/app/_components/form/FormButton';
import {
  CountrySelect,
  FormInput,
} from '@/app/_components/form/FormInput';
import { notify } from '@/components/utilities/helper';
import { useContacts } from '@/hooks/useContacts';
import { useCountries } from '@/hooks/useCountry';
import useGetLocalStorage from '@/hooks/useGetLocalStorage';
import { zodResolver } from '@hookform/resolvers/zod';

// Add this helper function at the top of your file
export const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

// Define schema validation using Zod
const schema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    phoneNumber: z.string().min(7, { message: 'Phone number must be at least 10 digits' }),
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }), 
});

type FormData = z.infer<typeof schema>;

interface CreateContactFormProps {
    onClose?: () => void;
}

const CreateContactForm: React.FC <CreateContactFormProps> = ({ onClose }) => {
    const { t } = useTranslation();

    const { getLocalStorage } = useGetLocalStorage();

    const { countries } = useCountries (); 
    const { createContact, isMutating, refetchEnterpriseContactsInStore } = useContacts();
    console.log('Countries:', countries);

    // Transform the countries data to include flags
    const formattedCountries = React.useMemo(() => {
        const result = countries.map(country => ({
            value: country.code.toLowerCase(),
            label: country.nom,
            flag: getCountryFlag(country.code)
        })) || [];
        console.log('Formatted Countries:', result);
        return result
    }, [countries]);

    // Initialize react-hook-form with resolver
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        notify.loading("Loading...");
        const data_new = {
            ...data,
            email: getLocalStorage("user").email, 
            enterpriseId: getLocalStorage("user")?.enterprise?.id,
        }
        try {
            console.log('New Contact:', data);
            await createContact(data_new);
            notify.success("Contact created successfully");
            refetchEnterpriseContactsInStore ()
            onClose?.();
        } catch (error: unknown) {
            console.error('Error creating contact:', error);
            notify.dismiss();
            notify.error("Error creating contact");
            return;
        } finally {
            notify.dismiss();
        }
    };

    return (
        <div className='max-h-[500px] overflow-y-auto p-2'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            className='border-primaryAppearance'
                            label={t('contact.contactForm.firstName')}
                            placeholder={t('contact.contactForm.firstNamePlaceHolder')}
                            error={errors.firstName?.message}
                        />
                    )}
                />

                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            className='border-primaryAppearance'
                            label={t('contact.contactForm.lastName')}
                            placeholder={t('contact.contactForm.lastNamePlaceHolder')}
                            error={errors.lastName?.message}
                        />
                    )}
                />

                <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            className='border-primaryAppearance' 
                            type="number"
                            label={t('contact.contactForm.phoneNumber')}
                            placeholder={t('contact.contactForm.phoneNumberPlaceHolder')}
                            error={errors.phoneNumber?.message}
                        />
                    )}
                />

                <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Country is required' }}
                    render={({ field }) => (
                        <CountrySelect
                            {...field}
                            options={formattedCountries}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.country?.message} // Include error for country
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
                            label=""
                            placeholder={t('contact.contactForm.cityPlaceHolder')}
                            error={errors.city?.message}
                        />
                    )}
                />

                <div className='flex flex-col gap-4'>
                    <FormButton className='bg-primaryAppearance h-[56px] text-white' type="submit">{ isMutating ? "Loading..." : "Submit" }</FormButton>
                </div>
            </form>
        </div>
    );
};

export default CreateContactForm;




