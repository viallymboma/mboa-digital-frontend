"use client";
import React from 'react';

import { useParams } from 'next/navigation';

import EmptyStateUI from '@/app/(dashboard)/_components/_global/EmptyStateUI';
import {
  GroupEmptyUISvgIcon,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { useGroups } from '@/hooks/useGroupOps';
import { useContactStore } from '@/stores/contacts.store';

import OneGroupData from './OneGroupData';
import OneGroupHeader from './OneGroupHeader';

const OneGroupModule = () => {
    const { id } = useParams();
    const { groups, isLoading, error } = useGroups();
    const { setSelectedContactsData, clearSelectedContacts } = useContactStore();

    const currentGroup = React.useMemo(() => 
        groups?.find(group => group.id === id),
        [groups, id]
    );
    console.log('Current Group in OnGroupModule:', currentGroup, id);

    // Update selectedContactsData when currentGroup changes
    React.useEffect(() => {
        if (currentGroup?.enterpriseContacts) {
            setSelectedContactsData(currentGroup.enterpriseContacts as []);
        }
        
        // Cleanup function to clear selected contacts when unmounting
        return () => {
            clearSelectedContacts();
        };
    }, [currentGroup, setSelectedContactsData, clearSelectedContacts]);


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
            <OneGroupHeader currentGroup={ currentGroup } />
            <div className='h-full flex flex-col items-center justify-center'>
                <OneGroupData currentGroup={currentGroup} />
            </div>
        </div>
    )
}

export default OneGroupModule