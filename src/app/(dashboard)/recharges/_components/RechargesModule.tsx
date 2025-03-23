"use client";

import React from 'react';

import {
  RechargesEmptyUISvgIcon,
  RechargesEmptyUISvgIcon2,
} from '@/app/svg_components/SvgIcons';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import RechargeForm from './_forms/RechargeForm';
import RechargesTableModule from './_tables/RechargesTableModule';

const RechargesModule = () => {
    const buttons = [
        {
            label: 'recharges.emptyUI.actionButtonLabel',
            icon: RechargesEmptyUISvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <RechargeForm />,
        },
    ];

    return (
        <>
            <RechargesTableModule />
            <EmptyStateUI
                SvgIcon={RechargesEmptyUISvgIcon2}
                mainTitle="recharges.emptyUI.mainTitle"
                secondTitle="recharges.emptyUI.secondTitle"
                buttons={buttons}
            />
        </>
    );
}

export default RechargesModule