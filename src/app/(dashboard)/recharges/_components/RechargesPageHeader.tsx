"use client";
import React from 'react';

import { useTranslations } from 'next-intl';

import { RechargesWhiteSvgIcon } from '@/app/svg_components/SvgIcons';
import { useRecharges } from '@/hooks/useRecharges';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';
import RechargeForm from './_forms/RechargeForm';

const RechargesPageHeader = () => {
    const t = useTranslations('recharges');
    const { recharges } = useRecharges();

    const buttons = [
        {
            label: t('header.rechargeButton'),
            icon: RechargesWhiteSvgIcon, 
            dialoContentStyle: "sm:max-w-[700px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <>
                <RechargeForm />
            </>,
        },
    ];

    const breadcrumbLinks = [
        { label: t('header.breadcrumb.dashboard'), href: '/dashboard' },
        { label: t('header.breadcrumb.recharges') },
    ];

    return (
        <>
            <GenericPageHeader data={recharges} buttons={buttons} title={t('header.title')} breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default RechargesPageHeader
