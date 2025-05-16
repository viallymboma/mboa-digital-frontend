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
// import { AddNewContactSvgIcon } from '@/app/svg_components/SvgIcons';
import { notify } from '@/components/utilities/helper';
import { useContacts } from '@/hooks/useContacts';
import { useCountries } from '@/hooks/useCountry';
import useGetLocalStorage from '@/hooks/useGetLocalStorage';
import { zodResolver } from '@hookform/resolvers/zod';

// Add this helper function at the top of your file
const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

// Define schema validation using Zod
const schema = z.object({
    firstname: z.string().min(1, { message: 'First name is required' }),
    lastname: z.string().min(1, { message: 'Last name is required' }),
    phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }), 
});

type FormData = z.infer<typeof schema>;

const CreateContactForm = () => {
    const { t } = useTranslation();

    const { getLocalStorage } = useGetLocalStorage();

    const {countries } = useCountries (); 
    const { createContact, isMutating, refetchEnterpriseContactsInStore } = useContacts();
    console.log('Countries:', countries);

    // Transform the countries data to include flags
    const formattedCountries = React.useMemo(() => {
        return countries?.map(country => ({
            value: country.code.toLowerCase(),
            label: country.nom,
            flag: getCountryFlag(country.code)
        })) || [];
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
                    name="firstname"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            className='border-primaryAppearance'
                            // label={t('contact.contactForm.fullName')}
                            label=""
                            placeholder={t('contact.contactForm.fullNamePlaceHolder')}
                            error={errors.firstname?.message}
                        />
                    )}
                />

                <Controller
                    name="lastname"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            className='border-primaryAppearance'
                            // label={t('contact.contactForm.fullName')}
                            label=""
                            placeholder={t('contact.contactForm.fullNamePlaceHolder')}
                            error={errors.lastname?.message}
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
                            // label={t('contact.contactForm.phoneNumber')}
                            label=""
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
                            // label="Country"
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
                            // label={t('contact.contactForm.city')}
                            label=""
                            placeholder={t('contact.contactForm.cityPlaceHolder')}
                            error={errors.city?.message}
                        />
                    )}
                />

                <div className='flex flex-col gap-4'>
                    <FormButton className='bg-primaryAppearance h-[56px] text-white' type="submit">{ isMutating ? "Loading..." : "Submit" }</FormButton>
                    {/* <button type="submit" className='flex flex-row rounded-lg justify-center gap-3 bg-primaryAppearance p-[1.5rem]'>
                        <AddNewContactSvgIcon color="white" />
                        <span className='text-[18px] text-white'>{t('contact.contactForm.buttonLabel')}</span>
                    </button> */}
                </div>
            </form>
        </div>
    );
};

export default CreateContactForm;




