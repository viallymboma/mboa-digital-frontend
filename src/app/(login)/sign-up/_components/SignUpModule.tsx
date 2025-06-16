"use client";

import React from 'react';

import { useTranslation } from 'react-i18next';

import { SvgIconsLogo } from '@/app/svg_components/SvgIcons';

import SignUpForm from './SignUpForm';

const SignUpModule = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex flex-row items-center justify-center bg-gray-100">
            <section className='flex-1 w-full h-screen items-center dark:bg-slate-900 flex flex-col p-[3rem] gap-[2rem]'>
                <div className='mt-[3rem] w-[75%]'>
                    <SvgIconsLogo />
                </div>
                <div className='flex flex-col gap-4 w-[75%] overflow-y-auto'>
                    <div className='mb-4'>
                        <h1 className='font-bold text-[36px]'>{ t('register.title') }</h1>
                    </div>
                    <SignUpForm />
                </div>
            </section>
            <section className='flex-1 bg-primaryAppearanceDim w-full h-screen'>
            </section>
        </div>
    )
}

export default SignUpModule