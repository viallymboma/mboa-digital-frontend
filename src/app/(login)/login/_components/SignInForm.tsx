"use client"
import React from 'react';

import Link from 'next/link';
import {
  Controller,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormButton } from '@/app/_components/form/FormButton';
import { FormInput } from '@/app/_components/form/FormInput';
// import FormInput from '@/app/_components/form/FormInput';
import FormPasswordInput from '@/app/_components/form/FormPasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})
// .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
// });

type FormData = z.infer<typeof schema>;

const SignInForm = () => {
    const { t } = useTranslation();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
                <div className='flex flex-col gap-2 w-full'>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                className='border-primaryAppearance h-[56px] flex-1 w-full'
                                label="Email" type={t('register.email')}
                                placeholder={t('register.emailPlaceHolder')} 
                                error={errors.email?.message}
                            />
                        )}
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <FormPasswordInput 
                                {...field}
                                className='border-primaryAppearance h-[56px] flex-1 w-full'
                                label={t('register.password')}
                                placeholder={t('register.passwordPlaceHolder')} 
                            />
                        )}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <FormButton className='bg-primaryAppearance h-[56px]' type="submit">Submit</FormButton>
                    <div className='flex items-center justify-center'>
                        <p className='text-center w-full'>
                            {t('register.signupPrompt')} <Link href={"/sign-up"} className='text-primaryAppearance'>{t('register.signup')}</Link> 
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignInForm