"use client";
import React from 'react';

import { useParams } from 'next/navigation';

import EmptyStateUI from '@/app/(dashboard)/_components/_global/EmptyStateUI';
import {
  GroupEmptyUISvgIcon,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { useGroupStore } from '@/stores/groups.store';

import OneGroupData from './OneGroupData';
import OneGroupHeader from './OneGroupHeader';

const OneGroupModule = () => {
    const { id } = useParams ()
    const { groups, isLoading, error } = useGroupStore();
    const currentGroup = React.useMemo(() => 
        groups?.find(group => group.id === id),
        [groups, id]
    );

    if (isLoading) {
        return (<div className='relative flex items-center justify-center w-full h-screen'>
            <div className="absolute  m-auto w-[10rem] h-[10rem] animate-spin p-4 rounded-full  border-t-[10px]  border-t-purple-600 border-primaryAppearanceLight">
            </div>
            <div className='flex items-center justify-center w-[10rem] h-[10rem] rounded-full'>
                <SvgLogoIcon height='98' width='100' />
            </div>
        </div>)
    }

    if (error) {
        return (
            <div>
                <OneGroupHeader currentGroup={ currentGroup } />
                <div className='h-full flex flex-col items-center justify-center'>
                    {/* <OneGroupData /> */}
                    <div className='flex items-center justify-center w-full h-screen bg-white'>
                        <div className="w-20 h-20 animate-spin p-4 rounded-full border-[10px] border-t-[10px]  border-t-blue-500 border-white">
                            error
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (Array.isArray(currentGroup?.enterpriseContacts) && currentGroup?.enterpriseContacts?.length === 0) {
        return (
            <div>
                <OneGroupHeader currentGroup={ currentGroup } />
                <div className='h-full flex flex-col items-center justify-center'>
                    {/* <OneGroupData /> */}
                    <EmptyStateUI
                            SvgIcon={GroupEmptyUISvgIcon}
                            mainTitle="group.emptyUI.mainTitle"
                            secondTitle="group.emptyUI.secondTitle"
                            buttons={[]}
                    />
                </div>
            </div>
        )
    }
    return (
        <div>
            <OneGroupHeader />
            <div className='h-full flex flex-col items-center justify-center'>
                <OneGroupData />
            </div>
        </div>
    )
}

export default OneGroupModule