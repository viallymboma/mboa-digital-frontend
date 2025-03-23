"use client"
import React from 'react';

import { HistoriesEmptyUISvgIcon } from '@/app/svg_components/SvgIcons';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import HistoriesTableModule from './_tables/HistoriesTableModule';

const HistoriesModule = () => {

    return (
        <>
            <HistoriesTableModule />
            <EmptyStateUI
                SvgIcon={HistoriesEmptyUISvgIcon}
                mainTitle="histories.emptyUI.mainTitle"
                secondTitle="histories.emptyUI.secondTitle"
                buttons={[]}
            />
        </>
    );
}

export default HistoriesModule