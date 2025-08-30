"use client";
import React from 'react';

import { useTranslations } from 'next-intl';
import {
  Controller,
  useForm,
} from 'react-hook-form';
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
import { useGroupStore } from '@/stores/groups.store';
import { zodResolver } from '@hookform/resolvers/zod';

export const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const schema = z.object({
    firstName: z.string().min(1, { message: 'contact.validation.firstNameRequired' }),
    lastName: z.string().min(1, { message: 'contact.validation.lastNameRequired' }),
    phoneNumber: z.string().min(7, { message: 'contact.validation.phoneNumberInvalid' }),
    country: z.string().min(1, { message: 'contact.validation.countryRequired' }),
    city: z.string().min(1, { message: 'contact.validation.cityRequired' }), 
});

type FormData = z.infer<typeof schema>;

interface CreateContactFormProps {
    onClose?: () => void;
}

const CreateContactForm: React.FC <CreateContactFormProps> = ({ onClose }) => {
    const t = useTranslations('contact');

    const { getLocalStorage } = useGetLocalStorage();
    const { toggleCreateGroupModal } = useGroupStore();

    const { countries } = useCountries(); 
    const { createContact, isMutating, refetchEnterpriseContactsInStore } = useContacts();

    const formattedCountries = React.useMemo(() => {
        const result = countries.map(country => ({
            value: country.code.toLowerCase(),
            label: country.nom,
            flag: getCountryFlag(country.code)
        })) || [];
        return result
    }, [countries]);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        notify.loading(t('loading.ongoing'));
        const data_new = {
            ...data,
            email: getLocalStorage("user").email, 
            enterpriseId: getLocalStorage("user")?.enterprise?.id,
        }
        try {
            await createContact(data_new);
            notify.success(t('loading.success'));
            refetchEnterpriseContactsInStore();
            onClose?.();
            reset();
            toggleCreateGroupModal(false);
        } catch (error: unknown) {
            console.error('Error creating contact:', error);
            notify.dismiss();
            notify.error(t('loading.error'));
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
                            label={t('contactForm.firstName')}
                            placeholder={t('contactForm.firstNamePlaceHolder')}
                            error={errors.firstName?.message ? t(errors.firstName.message) : undefined}
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
                            label={t('contactForm.lastName')}
                            placeholder={t('contactForm.lastNamePlaceHolder')}
                            error={errors.lastName?.message ? t(errors.lastName.message) : undefined}
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
                            label={t('contactForm.phoneNumber')}
                            placeholder={t('contactForm.phoneNumberPlaceHolder')}
                            error={errors.phoneNumber?.message ? t(errors.phoneNumber.message) : undefined}
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
                            error={errors.country?.message ? t(errors.country.message) : undefined}
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
                            placeholder={t('contactForm.cityPlaceHolder')}
                            error={errors.city?.message ? t(errors.city.message) : undefined}
                        />
                    )}
                />

                <div className='flex flex-col gap-4'>
                    <FormButton className='bg-primaryAppearance h-[56px] text-white' type="submit">{ isMutating ? t('loading.ongoing') : t('contactForm.submit') }</FormButton>
                </div>
            </form>
        </div>
    );
};

export default CreateContactForm;
