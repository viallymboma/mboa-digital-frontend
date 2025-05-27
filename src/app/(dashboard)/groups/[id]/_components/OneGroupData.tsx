"use client";
import React from 'react';

import { useParams } from 'next/navigation';

import { GroupType } from '@/types/groups';

// import { GroupType } from '@/types/groups';
import OneGroupTable from './OneGroupTable';

type OneGroupHeaderType = {
    currentGroup?: GroupType; // Define the type of currentGroup if known
};

const OneGroupData: React.FC <OneGroupHeaderType> = ({ currentGroup }) => {
    const { id } = useParams ()

    console.log (currentGroup, id, "needed info ===>")

    return (
        <div className=' w-[100%]'>
            <OneGroupTable />
        </div>
    )
}

export default OneGroupData