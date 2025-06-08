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
    });

    const onSubmit = async (data: FormData) => {
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Personal Information */}
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                label="First Name"
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
                                error={errors.lastName?.message}
                                className="border-primaryAppearance"
                            />
                        )}
                    />
                </div>

                {/* Enterprise Information */}
                <Controller
                    name="socialRaison"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            label="Social Reason"
                            error={errors.socialRaison?.message}
                            className="border-primaryAppearance"
                        />
                    )}
                />

                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                type="email"
                                label="Email"
                                error={errors.email?.message}
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
                                label="Phone Number"
                                error={errors.phoneNumber?.message}
                                className="border-primaryAppearance"
                            />
                        )}
                    />
                </div>

                {/* Location Information */}
                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                label="Country"
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
                                error={errors.city?.message}
                                className="border-primaryAppearance"
                            />
                        )}
                    />
                </div>

                {/* Enterprise Details */}
                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        name="activityDomain"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                label="Activity Domain"
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
                                label="Contribuable Number"
                                error={errors.contribuableNumber?.message}
                                className="border-primaryAppearance"
                            />
                        )}
                    />
                </div>

                {/* Security */}
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <FormPasswordInput 
                            {...field}
                            label="Password"
                            error={errors.password?.message}
                            className="border-primaryAppearance"
                        />
                    )}
                />

                <FormButton 
                    type="submit" 
                    className="w-full bg-primaryAppearance text-white"
                    disabled={isLoading}
                >
                    {isLoading ? <LoadingUI /> : 'Create Client'}
                </FormButton>

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