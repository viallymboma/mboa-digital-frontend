"use client";
import React from 'react';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';

const HistoriesPageHeader = () => {

    const breadcrumbLinks = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Historiques' },
    ];

    return (
        <>
            <GenericPageHeader title='Historiques' breadcrumbLinks={breadcrumbLinks} />
        </>
    )

}

export default HistoriesPageHeader