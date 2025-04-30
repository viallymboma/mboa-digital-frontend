"use client";
import React from 'react';

import {
  AddNewContactSvgIcon,
  GroupEmptyUISvgIcon,
} from '@/app/svg_components/SvgIcons';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import CreateContactForm from '../../contacts/_component/CreateContactForm';
import EtablissementsGrid from './EtablissementsGrid';

// import GroupsGrid from './GroupsGrid';

const EtablissementModule = () => {
    const buttons = [
        {
            label: 'group.emptyUI.newGroup',
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <CreateContactForm />,
        },
    ];

    return (
        <>
            <EtablissementsGrid />
            <EmptyStateUI
                SvgIcon={GroupEmptyUISvgIcon}
                mainTitle="group.emptyUI.mainTitle"
                secondTitle="group.emptyUI.secondTitle"
                buttons={buttons}
            />
        </>
    );
}

export default EtablissementModule