"use client";
import React from 'react';

import { GroupType } from '@/types/groups';

// import { GroupType } from '@/types/groups';
import OneGroupTable from './OneGroupTable';

type OneGroupHeaderType = {
    currentGroup?: GroupType; // Define the type of currentGroup if known
};

const OneGroupData: React.FC <OneGroupHeaderType> = ({ currentGroup }) => {

    return (
        <div className=' w-[100%]'>
            <OneGroupTable contacts={currentGroup?.enterpriseContacts} />
        </div>
    )
}

export default OneGroupData