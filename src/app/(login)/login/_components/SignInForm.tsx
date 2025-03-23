"use client"
import React from 'react';

import { useForm } from 'react-hook-form';
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

    const { handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput name="email" className='border-black' placeholder={t('register.emailPlaceHolder')} label="Email" type={t('register.email')} />
                <FormPasswordInput name="password" placeholder={t('register.passwordPlaceHolder')} label={t('register.password')} />
                <div>
                    <FormButton className='bg-primaryAppearance' type="submit">Submit</FormButton>
                    <div className='flex items-center justify-center'>
                        <p className='text-center w-full'>
                            {t('register.loginPrompt')} <span className='text-primaryAppearance'>{t('register.login')}</span> 
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignInForm