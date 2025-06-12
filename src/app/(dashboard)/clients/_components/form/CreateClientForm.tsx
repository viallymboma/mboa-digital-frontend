"use client";
import React from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormButton } from '@/app/_components/form/FormButton';
import { FormInput } from '@/app/_components/form/FormInput';
import { FormPasswordInput } from '@/app/_components/form/FormPasswordInput';
import LoadingUI from '@/components/loaders/LoadingUI';
import { notify } from '@/components/utilities/helper';
import { useSignup } from '@/hooks/useAuth.hook';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    socialRaison: z.string().min(1, { message: 'Social reason is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    phoneNumber: z.string().min(9, { message: 'Phone number is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    activityDomain: z.string().min(1, { message: 'Activity domain is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    contribuableNumber: z.string().min(1, { message: 'Contribuable number is required' }),
    villeEntreprise: z.string().min(1, { message: 'Enterprise city is required' }),
    numeroCommerce: z.string().min(1, { message: 'Commerce number is required' }),
    urlImage: z.string().optional(),
    urlSiteweb: z.string().optional(),
    telephoneEntreprise: z.string().min(9, { message: 'Enterprise phone is required' }),
    smsESenderId: z.string().min(1, { message: 'SMS sender ID is required' }),
    adresseEnterprise: z.string().min(1, { message: 'Enterprise address is required' }),
    emailEnterprise: z.string().email({ message: 'Invalid enterprise email' }),
    enterpriseCountryId: z.string().min(1, { message: 'Enterprise country is required' }),
});

type FormData = z.infer<typeof schema>;

const CreateClientForm = ({ onClose }: { onClose?: () => void }) => {
    // const { t } = useTranslation();
    // const { createClient, isLoading } = useClients();
    const { signup, isLoading, error } = useSignup();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange', // Validate on change
        defaultValues: {
            firstName: '',
            lastName: '',
            socialRaison: '',
            email: '',
            password: '',
            phoneNumber: '',
            country: '',
            city: '',
            activityDomain: '',
            address: '',
            contribuableNumber: '',
            villeEntreprise: '',
            numeroCommerce: '',
            urlImage: '',
            urlSiteweb: '',
            telephoneEntreprise: '',
            smsESenderId: '',
            adresseEnterprise: '',
            emailEnterprise: '',
            enterpriseCountryId: ''
        }
    });

    const onSubmit = async (data: FormData) => {
        console.log('Form data:', data);
        try {
            notify.loading('Creating client...');
            await signup({
                ...data
            });
            notify.success('Client created successfully');
            onClose?.();
        } catch (error: unknown) {
            let errorMessage = 'Failed to create client';

            type ErrorResponse = {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
            };

            const err = error as ErrorResponse;

            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in err &&
                typeof err.response === 'object' &&
                err.response !== null &&
                'data' in err.response &&
                typeof err.response.data === 'object' &&
                err.response.data !== null &&
                'message' in err.response.data
            ) {
                errorMessage = err.response.data.message as string;
            }
            notify.error(errorMessage);
            console.error('Client creation failed:', error);
        } finally {
            notify.dismiss();
        }
    };

    return (
        <div className="max-h-[80vh] overflow-y-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Section */}
                <FormSection title="Personal Information">
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="First Name"
                                    placeholder="Enter first name"
                                    error={errors.firstName?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="Last Name"
                                    placeholder="Enter last name"
                                    error={errors.lastName?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* Enterprise Information Section */}
                <FormSection title="Enterprise Information">
                    <Controller
                        name="socialRaison"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                label="Company Name"
                                placeholder="Enter company name"
                                error={errors.socialRaison?.message}
                                className="border-primaryAppearance"
                            />
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="activityDomain"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="Business Sector"
                                    placeholder="e.g. Technology, Retail"
                                    error={errors.activityDomain?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                        <Controller
                            name="contribuableNumber"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="Tax ID"
                                    placeholder="Enter tax ID number"
                                    error={errors.contribuableNumber?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* Contact Information Section */}
                <FormSection title="Contact Information">
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    type="email"
                                    label="Personal Email"
                                    placeholder="name@example.com"
                                    error={errors.email?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                        <Controller
                            name="emailEnterprise"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    type="email"
                                    label="Company Email"
                                    placeholder="company@example.com"
                                    error={errors.emailEnterprise?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    type="tel"
                                    label="Personal Phone"
                                    placeholder="+237 6XX XXX XXX"
                                    error={errors.phoneNumber?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                        <Controller
                            name="telephoneEntreprise"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    type="tel"
                                    label="Company Phone"
                                    placeholder="+237 6XX XXX XXX"
                                    error={errors.telephoneEntreprise?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* Location Section */}
                <FormSection title="Location Details">
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="Country"
                                    placeholder="Select country"
                                    error={errors.country?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="City"
                                    placeholder="Enter city"
                                    error={errors.city?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="Address"
                                    placeholder="Enter address"
                                    error={errors.address?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* SMS Configuration Section */}
                <FormSection title="SMS Configuration">
                    <Controller
                        name="smsESenderId"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                label="SMS Sender ID"
                                placeholder="Enter sender ID"
                                error={errors.smsESenderId?.message}
                                className="border-primaryAppearance"
                            />
                        )}
                    />
                </FormSection>

                {/* Security Section */}
                <FormSection title="Security">
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <FormPasswordInput 
                                {...field}
                                label="Password"
                                placeholder="Enter secure password"
                                error={errors.password?.message}
                                className="border-primaryAppearance"
                            />
                        )}
                    />
                </FormSection>

                {/* <FormButton 
                    type="submit" 
                    className="w-full bg-primaryAppearance text-white py-3 rounded-lg"
                    disabled={isLoading}
                >
                    {isLoading ? <LoadingUI /> : 'Create Client'}
                </FormButton> */}

                <div className='flex flex-col gap-4'>
                    <FormButton className='bg-primaryAppearance h-[56px]' type="submit">{ isLoading ? (
                        <LoadingUI />
                    ) : "Submit" }</FormButton>
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error.message}
                        </div>
                    )}
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateClientForm;


const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);