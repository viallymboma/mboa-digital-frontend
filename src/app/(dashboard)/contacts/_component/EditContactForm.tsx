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
import { useContactStore } from '@/stores/contacts.store';
import { UpdateContactRequestType } from '@/types/contact';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema for edit form validation
const editSchema = z.object({
    firstname: z.string().min(1, { message: 'First name is required' }),
    lastname: z.string().min(1, { message: 'Last name is required' }),
    phoneNumber: z.string().min(7, { message: 'Phone number must be at least 10 digits' }),
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }), 
});

type EditFormData = z.infer<typeof editSchema>;

interface EditContactFormProps {
    contact: UpdateContactRequestType;
    onClose?: () => void;
}

const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const EditContactForm: React.FC<EditContactFormProps> = ({ contact, onClose }) => {
    const { t } = useTranslation();
    const { countries } = useCountries();
    const { toggleModal } = useContactStore();
    const { editContact, isUpdating, refetchEnterpriseContactsInStore } = useContacts();

    const formattedCountries = React.useMemo(() => {
        return countries?.map(country => ({
            value: country.code.toLowerCase(),
            label: country.nom,
            flag: getCountryFlag(country.code)
        })) || [];
    }, [countries]);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<EditFormData>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            firstname: contact.firstname,
            lastname: contact.lastname,
            phoneNumber: contact.phoneNumber,
            country: contact.country,
            city: contact.city,
        }
    });

    const onSubmit = async (data: EditFormData) => {
        notify.loading("Updating contact...");
        try {
            await editContact({
                ...data,
                id: contact.id,
                email: contact.email,
                enterpriseId: contact.enterpriseId,
                socialRaison: contact?.socialRaison, 
                activityDomain: contact?.activityDomain, 
                villeEntreprise: contact?.villeEntreprise, 
                contribuableNumber: contact?.contribuableNumber, 
                pays: contact?.pays,
                user: contact?.user,
                smsSenderId: contact?.smsSenderId, 
                createdAt: contact.createdAt,
            });
            notify.success("Contact updated successfully");
            refetchEnterpriseContactsInStore();
            reset ();
            onClose?.();
            toggleModal(false);
            toggleModal(undefined as unknown as boolean); // Close the modal
        } catch (error) {
            console.error('Error updating contact:', error);
            notify.error("Error updating contact");
        } finally {
            console.error('Finished process in finally');
            // notify.dismiss();
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
                            label=""
                            placeholder={t('contact.contactForm.phoneNumberPlaceHolder')}
                            error={errors.phoneNumber?.message}
                        />
                    )}
                />

                <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                        <CountrySelect
                            {...field}
                            options={formattedCountries}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.country?.message}
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
                    <FormButton 
                        className='bg-primaryAppearance h-[56px] text-white' 
                        type="submit"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update Contact"}
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

export default EditContactForm;