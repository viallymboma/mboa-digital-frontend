"use client";
import React from 'react';

import { RechargesWhiteSvgIcon } from '@/app/svg_components/SvgIcons';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';
import RechargeForm from './_forms/RechargeForm';

const RechargesPageHeader = () => {

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
            <GenericPageHeader buttons={buttons} title='Recharges' breadcrumbLinks={breadcrumbLinks} />
        </>
    )

}

export default RechargesPageHeader