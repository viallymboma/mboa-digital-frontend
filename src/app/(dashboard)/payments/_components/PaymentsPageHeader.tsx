"use client";
import React from 'react';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';

const PaymentsPageHeader = () => {

    const breadcrumbLinks = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Paiements' },
    ];

    return (
        <>
            <GenericPageHeader title='Paiements' breadcrumbLinks={breadcrumbLinks} />
        </>
    )

}

export default PaymentsPageHeader