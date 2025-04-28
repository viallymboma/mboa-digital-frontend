"use client";
import React from 'react';

import { PaymentEmptyUISvgIcon } from '@/app/svg_components/SvgIcons';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import PaymentsTableModule from './_tables/PaymentsTableModule';

const PaymentModule = () => {
    return (
        <>
            <PaymentsTableModule />
            <EmptyStateUI
                SvgIcon={PaymentEmptyUISvgIcon}
                mainTitle="payments.emptyUI.mainTitle"
                secondTitle="payments.emptyUI.secondTitle"
                buttons={[]}
            />
        </>
    )
}

export default PaymentModule