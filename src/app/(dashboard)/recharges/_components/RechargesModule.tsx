"use client";
import React from 'react';

import { useTranslations } from 'next-intl';

import {
  RechargesEmptyUISvgIcon,
  RechargesEmptyUISvgIcon2,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { useRecharges } from '@/hooks/useRecharges';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import RechargeForm from './_forms/RechargeForm';
import RechargesTableModule from './_tables/RechargesTableModule';

const RechargesModule = () => {
    const t = useTranslations('recharges');
    const { recharges, isLoading, error } = useRecharges();
    const buttons = [
        {
            label: t('emptyUI.actionButtonLabel'),
            icon: RechargesEmptyUISvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <RechargeForm />,
        },
    ];

    if (isLoading) {
        return (<div className='relative flex items-center justify-center w-full h-screen'>
            <div className="absolute m-auto w-[10rem] h-[10rem] animate-spin p-4 rounded-full border-t-[10px] border-t-purple-600 border-primaryAppearanceLight">
            </div>
            <div className='flex items-center justify-center w-[10rem] h-[10rem] rounded-full'>
                <SvgLogoIcon height='98' width='100' />
            </div>
        </div>)
    }

    if (error) {
        return (
            <div className='flex items-center justify-center w-full h-screen bg-white'>
                <div className="w-20 h-20 animate-spin p-4 rounded-full border-[10px] border-t-[10px] border-t-blue-500 border-white">
                    {t('module.error')}
                </div>
            </div>
        )
    }

    if (Array.isArray(recharges) && recharges.length === 0) {
        return (
            <div className='mt-[6rem] flex flex-col items-center justify-start w-full h-screen bg-white'>
                <EmptyStateUI
                    SvgIcon={RechargesEmptyUISvgIcon2}
                    mainTitle="emptyUI.mainTitle"
                    secondTitle="emptyUI.secondTitle"
                    buttons={buttons}
                />
            </div>
        )
    }

    return (
        <>
            <RechargesTableModule />
        </>
    );
}

export default RechargesModule
