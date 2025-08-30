"use client";
import React from 'react';

import { RechargesWhiteSvgIcon } from '@/app/svg_components/SvgIcons';
import { useRecharges } from '@/hooks/useRecharges';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';
import RechargeForm from './_forms/RechargeForm';

const RechargesPageHeader = () => {
    const { recharges } = useRecharges();

    const buttons = [
        {
            label: 'Recharger',
            icon: RechargesWhiteSvgIcon, 
            dialoContentStyle: "sm:max-w-[700px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <>
                <RechargeForm />
            </>,
        },
    ];

    const breadcrumbLinks = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Recharges' },
    ];

    return (
        <>
            <GenericPageHeader data={recharges} buttons={buttons} title='Recharges' breadcrumbLinks={breadcrumbLinks} />
        </>
    )

}

export default RechargesPageHeader