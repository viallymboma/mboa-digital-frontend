"use client";
import React from 'react';

import { useTranslations } from 'next-intl';

import {
  HistoriesEmptyUISvgIcon,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { useHistories } from '@/hooks/useHistories';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import HistoriesTableModule from './_tables/HistoriesTableModule';

const HistoriesModule = () => {
    const t = useTranslations('histories');
    const { histories, isLoading, error } = useHistories();
    console.log('HistoriesModule histories:', histories);

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
        return (<div className='flex items-center justify-center w-full h-screen bg-white'>
            <div className="w-20 h-20 animate-spin p-4 rounded-full border-[10px] border-t-[10px] border-t-blue-500 border-white">
                {t('module.error')}
            </div>
        </div>)
    }

    if (Array.isArray(histories) && histories.length === 0) {
        return (<EmptyStateUI
            SvgIcon={HistoriesEmptyUISvgIcon}
            mainTitle="emptyUI.mainTitle"
            secondTitle="emptyUI.secondTitle"
            buttons={[]}
        />)
    }

    return (
        <>
            <HistoriesTableModule />
        </>
    );
}

export default HistoriesModule
