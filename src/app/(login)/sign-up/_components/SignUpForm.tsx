import React from 'react';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormButton } from '@/app/_components/form/FormButton';
import { FormInput } from '@/app/_components/form/FormInput';
import FormPasswordInput from '@/app/_components/form/FormPasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const SignUpForm = () => {

    const { t } = useTranslation();

    const { handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
                <div className='flex justify-around flex-row gap-3 w-full '>
                    <FormInput className='h-[56px] flex-1 w-full' name="firstName" placeholder={t('register.firstNamePlaceHolder')} label={t('register.firstName')} />
                    <FormInput className='h-[56px] flex-1' name="lastName" placeholder={t('register.lastNamePlaceHolder')} label={t('register.lastName')} />
                </div>
                <FormInput className='h-[56px]' name="email" placeholder={t('register.emailPlaceHolder')} label="Email" type={t('register.email')} />
                <FormPasswordInput className='h-[56px]' name="password" placeholder={t('register.passwordPlaceHolder')} label={t('register.password')} />
                <FormPasswordInput className='h-[56px]' name="confirmPassword" placeholder={t('register.confirmPasswordPlaceHolder')} label={t('register.confirmPassword')} />
                <div className='flex flex-col gap-4'>
                    <FormButton className='bg-primaryAppearance h-[56px]' type="submit">Submit</FormButton>
                    <div className='flex items-center justify-center'>
                        <p className='text-center w-full'>
                            {t('register.loginPrompt')} <Link href={"/login"} className='text-primaryAppearance'>{t('register.login')}</Link> 
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm