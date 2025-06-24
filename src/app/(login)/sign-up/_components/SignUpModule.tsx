"use client";

import React from 'react';

import { useTranslation } from 'react-i18next';

import { SvgIconsLogo } from '@/app/svg_components/SvgIcons';
import { ScrollArea } from '@/components/ui/scroll-area';

import SignUpForm from './SignUpForm';

const SignUpModule = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex flex-row items-center justify-center bg-gray-100">
            {/* <section className='flex-1 w-full h-screen items-center dark:bg-slate-900 flex flex-col p-[3rem] gap-[2rem]'>
                <div className='mt-[3rem] w-[75%]'>
                    <SvgIconsLogo />
                </div>
                <ScrollArea className="flex flex-col gap-4 rounded-md p-4">
                    <div className='mb-4'>
                        <h1 className='font-bold text-[36px]'>{ t('register.title') }</h1>
                    </div>
                    <SignUpForm />
                </ScrollArea>
            </section> */}
            <ScrollArea className="flex flex-col w-1/2 h-screen rounded-md px-[5rem] gap-[2rem]">
                <div className='mt-[3rem] w-[75%]'>
                    <SvgIconsLogo />
                </div>
                <div className='mb-4'>
                    <h1 className='font-bold text-[36px]'>{ t('register.title') }</h1>
                </div>
                <SignUpForm />
            </ScrollArea>
            <section className='flex-1 flex justify-center items-center bg-primaryAppearanceDim w-full h-screen'>
                <SvgIconsLogo height='180' width='400' />
            </section>
        </div>
    )
}

export default SignUpModule