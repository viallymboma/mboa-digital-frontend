"use client";
import React from 'react';

import { useTranslations } from 'next-intl';

import GenericPageHeader from '../../_components/_global/GenericPageHeader';

const HistoriesPageHeader = () => {
    const t = useTranslations('histories');

    const breadcrumbLinks = [
        { label: t('header.breadcrumb.dashboard'), href: '/dashboard' },
        { label: t('header.breadcrumb.histories') },
    ];

    return (
        <>
            <GenericPageHeader title={t('header.title')} breadcrumbLinks={breadcrumbLinks} />
        </>
    )
}

export default HistoriesPageHeader
