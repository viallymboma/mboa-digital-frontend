"use client";
import React from 'react';

import { PaymentEmptyUISvgIcon } from '@/app/svg_components/SvgIcons';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';

const PaymentModule = () => {
    return (
        <EmptyStateUI
            SvgIcon={PaymentEmptyUISvgIcon}
            mainTitle="payments.emptyUI.mainTitle"
            secondTitle="payments.emptyUI.secondTitle"
            buttons={[]}
        />
    )
}

export default PaymentModule