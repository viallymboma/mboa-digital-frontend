"use client"
import React from 'react';

import { HistoriesEmptyUISvgIcon } from '@/app/svg_components/SvgIcons';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';

const HistoriesModule = () => {

    return (
        <EmptyStateUI
            SvgIcon={HistoriesEmptyUISvgIcon}
            mainTitle="histories.emptyUI.mainTitle"
            secondTitle="histories.emptyUI.secondTitle"
            buttons={[]}
        />
    );
}

export default HistoriesModule