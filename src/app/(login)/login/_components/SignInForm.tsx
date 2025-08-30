"use client";
import React from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Controller,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { FormButton } from '@/app/_components/form/FormButton';
import { FormInput } from '@/app/_components/form/FormInput';
import { FormPasswordInput } from '@/app/_components/form/FormPasswordInput';
import LoadingUI from '@/components/loaders/LoadingUI';
import { notify } from '@/components/utilities/helper';
import { useLogin } from '@/hooks/useAuth.hook';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof schema>;

const SignInForm = () => {
  // Load translations for 'register' and 'loading' namespaces
  const tRegister = useTranslations('register');
  const tLoading = useTranslations('loading');

  const router = useRouter();
  const { login, isLoading, error } = useLogin();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    notify.loading(tLoading('login.ongoing'));
    try {
      console.log('Form data:', data);
      await login(data);
      notify.dismiss();
      notify.success(tLoading('login.success'));
      router.push('/dashboard');
    } catch (error) {
      notify.success(tLoading('login.error')); // Note: Using notify.success for error might be a typo; consider notify.error
      console.error('Login failed:', error);
    }
  };

  // Debugging: Log some translation keys (optional, can be removed in production)
  console.log(tRegister('password'), tRegister('signupPrompt'), tRegister('remainingSMS'));

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-full">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                {...field}
                className="border-primaryAppearance h-[56px] flex-1 w-full"
                label={tRegister('email')}
                type="email"
                placeholder={tRegister('emailPlaceHolder')}
                error={errors.email?.message}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormPasswordInput
                {...field}
                className="border-primaryAppearance h-[56px] flex-1 w-full"
                label={tRegister('password')}
                placeholder={tRegister('passwordPlaceHolder')}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <FormButton className="bg-primaryAppearance h-[56px] text-white" type="submit">
            {isLoading ? <LoadingUI /> : tRegister('login')}
          </FormButton>
          <div className="flex items-center justify-center">
            <p className="text-center w-full">
              {tRegister('signupPrompt')}{' '}
              <Link href="/sign-up" className="text-primaryAppearance">
                {tRegister('signup')}
              </Link>
            </p>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

// "use client"
// import React from 'react';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import {
//   Controller,
//   useForm,
// } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { z } from 'zod';

// import { FormButton } from '@/app/_components/form/FormButton';
// import { FormInput } from '@/app/_components/form/FormInput';
// import { FormPasswordInput } from '@/app/_components/form/FormPasswordInput';
// import LoadingUI from '@/components/loaders/LoadingUI';
// import { notify } from '@/components/utilities/helper';
// import { useLogin } from '@/hooks/useAuth.hook';
// import { zodResolver } from '@hookform/resolvers/zod';

// const schema = z.object({
//     email: z.string().email({ message: 'Invalid email address' }),
//     password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
// })

// type FormData = z.infer<typeof schema>;

// const SignInForm = () => {
//     const { t } = useTranslation();

//     const router = useRouter();

//     const { login, isLoading, error } = useLogin();

//     const {
//         handleSubmit,
//         control,
//         formState: { errors },
//     } = useForm<FormData>({
//         resolver: zodResolver(schema),
//     });

//     const onSubmit = async (data: FormData) => {
//         notify.loading(t('loading.login.ongoing'));
//         try {
//             console.log('Form data:', data);
//             await login(data);
//             notify.dismiss();
//             notify.success(t('loading.login.success'));
//             // Optionally, you can redirect the user or perform other actions here
//             // Handle successful login, e.g., redirect to dashboard
//             router.push('/dashboard');
//         } catch (error) {
//             notify.success(t('loading.login.error'));
//             console.error('Login failed:', error);
//         }
//     };

//     console.log(t('register.password'), t('register.signupPrompt'), t('register.remainingSMS'));

//     return (
//         <div>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
//                 <div className='flex flex-col gap-2 w-full'>
//                     <Controller
//                         name="email"
//                         control={control}
//                         defaultValue="" // Add default value here too
//                         render={({ field }) => (
//                             <FormInput 
//                                 {...field}
//                                 className='border-primaryAppearance h-[56px] flex-1 w-full'
//                                 label="Email"
//                                 type="email"
//                                 placeholder={t('register.emailPlaceHolder')} 
//                                 error={errors.email?.message}
//                             />
//                         )}
//                     />
//                 </div>
//                 <div className='flex flex-col gap-2 w-full'>
//                     <Controller
//                         name="password"
//                         control={control}
//                         render={({ field }) => (
//                             <FormPasswordInput 
//                                 {...field}
//                                 className='border-primaryAppearance h-[56px] flex-1 w-full'
//                                 label={t('register.password')}
//                                 placeholder={t('register.passwordPlaceHolder')} 
//                             />
//                         )}
//                     />
//                 </div>
//                 <div className='flex flex-col gap-4'>
//                     <FormButton className='bg-primaryAppearance h-[56px] text-white' type="submit">{ isLoading ? (
//                         <LoadingUI />
//                     ) : "Submit" }</FormButton>
//                     <div className='flex items-center justify-center'>
//                         <p className='text-center w-full'>
//                             { t('register.signupPrompt')} <Link href={"/sign-up"} className='text-primaryAppearance'>{t('register.signup')}</Link> 
//                         </p>
//                     </div>
//                     {error && (
//                         <div className="text-red-500 text-sm text-center">
//                             {error.message}
//                         </div>
//                     )}
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default SignInForm