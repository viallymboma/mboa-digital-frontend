"use client";
import React from 'react';

import {
  AddNewContactSvgIcon,
  GroupEmptyUISvgIcon,
  SvgLogoIcon,
} from '@/app/svg_components/SvgIcons';
import { useGroups } from '@/hooks/useGroupOps';

import EmptyStateUI from '../../_components/_global/EmptyStateUI';
import CreateGroupForm from './forms/CreateGroupForm';
import GroupsGrid from './GroupsGrid';

const GroupModule = () => {
    const { 
        groups, 
        isLoading,
        error,
    } = useGroups();

    console.log('Groups in group module:', groups);

    const buttons = [
        {
            label: 'group.emptyUI.newGroup',
            icon: AddNewContactSvgIcon, 
            dialoContentStyle: "sm:max-w-[425px]", 
            buttonBg: "bg-primaryAppearance", 
            dialogContent: <CreateGroupForm />,
        },
    ];

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
        return (<div className='flex items-center justify-center w-full h-screen bg-white'>
                <div className="w-20 h-20 animate-spin p-4 rounded-full border-[10px] border-t-[10px]  border-t-blue-500 border-white">
                    error
                </div>
            </div>)
    }

    if (Array.isArray(groups) && groups.length === 0) {
        return (<EmptyStateUI
                SvgIcon={GroupEmptyUISvgIcon}
                mainTitle="group.emptyUI.mainTitle"
                secondTitle="group.emptyUI.secondTitle"
                buttons={buttons}
        />)
    }

    return (
        <>
            <GroupsGrid />
        </>
    );
}

export default GroupModule

// "use client";
// import React from 'react';

// import {
//   AddNewContactSvgIcon,
//   GroupEmptyUISvgIcon,
//   SvgLogoIcon,
// } from '@/app/svg_components/SvgIcons';
// import { useGroups } from '@/hooks/useGroupOps';

// import EmptyStateUI from '../../_components/_global/EmptyStateUI';
// import CreateGroupForm from './forms/CreateGroupForm';
// import GroupsGrid from './GroupsGrid';

// const GroupModule = () => {
//     const { 
//         groups, 
//         isLoading,
//         error,
//     } = useGroups();

//     console.log('Groups in group module:', groups);

//     const buttons = [
//         {
//             label: 'group.emptyUI.newGroup',
//             icon: AddNewContactSvgIcon, 
//             dialoContentStyle: "sm:max-w-[425px]", 
//             buttonBg: "bg-primaryAppearance", 
//             dialogContent: <CreateGroupForm />,
//         },
//     ];

//     if (isLoading) {
//         return (<div className='relative flex items-center justify-center w-full h-screen'>
//             <div className="absolute  m-auto w-[10rem] h-[10rem] animate-spin p-4 rounded-full  border-t-[10px]  border-t-purple-600 border-primaryAppearanceLight">
//             </div>
//             <div className='flex items-center justify-center w-[10rem] h-[10rem] rounded-full'>
//                 <SvgLogoIcon height='98' width='100' />
//             </div>
//         </div>)
//     }

//     if (error) {
//         return (<div className='flex items-center justify-center w-full h-screen bg-white'>
//                 <div className="w-20 h-20 animate-spin p-4 rounded-full border-[10px] border-t-[10px]  border-t-blue-500 border-white">
//                     error
//                 </div>
//             </div>)
//     }

//     if (Array.isArray(groups) && groups.length === 0) {
//         return (<EmptyStateUI
//                 SvgIcon={GroupEmptyUISvgIcon}
//                 mainTitle="group.emptyUI.mainTitle"
//                 secondTitle="group.emptyUI.secondTitle"
//                 buttons={buttons}
//         />)
//     }

//     return (
//         <>
//             <GroupsGrid />
//         </>
//     );
// }

// export default GroupModule