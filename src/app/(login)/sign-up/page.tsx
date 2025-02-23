'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

import { FormButton } from '@/app/_components/form/FormButton';
import FormInput from '@/app/_components/form/FormInput';
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

export default function RegisterPage() {
    const { t } = useTranslation('register');
    console.log(t('register.title'))
    const { handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput name="firstName" label={t('register.firstName')} />
                <FormInput name="lastName" label={t('register.lastName')} />
                <FormInput name="email" label="Email" type={t('register.email')} />
                <FormPasswordInput name="password" label={t('register.password')} />
                <FormPasswordInput name="confirmPassword" label={t('register.confirmPassword')} />
                <FormButton type="submit">Submit</FormButton>
                {/* <FormSelect
                    {...register('')}
                    name="role"
                    label="Role"
                    options={[
                    { value: 'admin', label: 'Admin' },
                    { value: 'user', label: 'User' },
                    ]}
                /> */}
                {/* <FormTextArea name="bio" label="Bio" /> */}
            </form>
        </div>
    );
}