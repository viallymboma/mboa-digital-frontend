import React from 'react';

import Link from 'next/link';

import {
  GroupContactCountSvgIcon,
  GroupContactViewMoreSvgIcon,
} from '@/app/svg_components/SvgIcons';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { GroupType } from './GroupePageSampleData';

const GroupCard = ({ group, view }: { group: GroupType; view: 'grid' | 'list' }) => {
  return (
    <div
      className={`relative flex items-center p-3 border-2 border-primaryAppearance rounded-[20px] shadow-md transition-transform duration-300 ease-in-out cursor-pointer group ${
        view === 'list' ? 'flex-row w-full' : 'flex-row w-full'
      }`}
    >
      {/* Avatar */}
      <div className="rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center text-2xl font-semibold">
        {group.name.slice(0, 2).toUpperCase()}
      </div>

      {/* Content */}
      <div className={`flex flex-row justify-between items-center w-[80%] ml-4`}>
        <div className="p-4 rounded-lg">
          <h2 className="text-lg font-semibold">{group.name}</h2>
          <div className="flex flex-row items-center gap-2">
            <GroupContactCountSvgIcon />
            <p className="text-sm text-gray-600">{group.contactCount} Contacts</p>
          </div>
        </div>

        {/* View More Popover */}
        <div>
          <Popover>
            <PopoverTrigger>
              <GroupContactViewMoreSvgIcon />
            </PopoverTrigger>
            <PopoverContent>
              <Card>
                <CardContent>
                  <Link href={`/groups/${group.id}`}>
                    <p>View More</p>
                  </Link>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
















// import React from 'react';

// import Link from 'next/link';

// import {
//   GroupContactCountSvgIcon,
//   GroupContactViewMoreSvgIcon,
// } from '@/app/svg_components/SvgIcons';
// import {
//   Card,
//   CardContent,
// } from '@/components/ui/card';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';

// import { GroupType } from './GroupePageSampleData';

// const GroupCard = ({ group }: { group: GroupType }) => {
//     return (
//         <div className="relative flex flex-row gap-4 items-center p-3 border-2 border-primaryAppearance rounded-[20px] shadow-md hover:border-primaryAppearance hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group">
//             {/* Border Animation */}
//             {/* <div className="absolute inset-0 border-[10px] border-transparent rounded-lg group-hover:border-primaryAppearance group-hover:animate-border-spin"></div> */}

//             {/* Content */}
//             <div className=' rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center text-2xl font-semibold'>
//                 {group.name.split("")[0].toUpperCase()}{group.name.split("")[1].toUpperCase()}
//             </div>
//             <div className=' w-[80%] flex flex-row justify-between items-center gap-4'>
//                 <div className='p-4 rounded-lg flex flex-col items-start'>
//                     <h2 className="text-lg font-semibold">{group.name}</h2>
//                     <div className='flex flex-row items-center gap-2'>
//                         <GroupContactCountSvgIcon />
//                         <p className="text-sm text-gray-600">{group.contactCount} Contacts</p>
//                     </div>
//                 </div>
//                 <div>
                    
//                     <Popover>
//                         <PopoverTrigger>
//                             <GroupContactViewMoreSvgIcon />
//                         </PopoverTrigger>
//                         <PopoverContent>
//                             <Card>
//                                 <CardContent>
//                                     <Link href={`/groups/${group.id}`}>
//                                         <p>View More</p>
//                                     </Link>
//                                 </CardContent>
//                             </Card>
//                         </PopoverContent>
//                     </Popover>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GroupCard;










// import React from 'react';

// import { GroupContactCountSvgIcon } from '@/app/svg_components/SvgIcons';

// import { GroupType } from './GroupePageSampleData';

// const GroupCard = ({ group }: { group: GroupType }) => {
//     return (
//         <div className="border-primaryAppearance flex flex-row items-center p-4 border rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
//             <div className='rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center text-2xl font-semibold'>
//                 { group.name.split("")[0].toUpperCase() }{ group.name.split("")[1].toUpperCase() }
//             </div>
//             <div className='p-4 rounded-lg flex flex-col items-start'>
//                 <h2 className=" text-lg font-semibold">{group.name}</h2>
//                 <div className='flex flex-row items-center gap-2'>
//                     <GroupContactCountSvgIcon />
//                     <p className="text-sm text-gray-600">{group.contactCount} Contacts</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GroupCard