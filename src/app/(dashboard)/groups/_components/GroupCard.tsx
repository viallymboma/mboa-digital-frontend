import React from 'react';

import { UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGroups } from '@/hooks/useGroupOps';
import { formatDate } from '@/lib/formatDate';
import { GroupType } from '@/types/groups';

import AddContactsToGroupForm from './forms/AddContactsToGroupForm';

const GroupCard = ({ group, view }: { group: GroupType; view: 'grid' | 'list' }) => {
  const t = useTranslations('group');
  const [isAddContactsModalOpen, setIsAddContactsModalOpen] = React.useState(false);
  const { deleteGroup } = useGroups();
  return (
    <>
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
            <Link 
              href={`/groups/${group.id}`}
            >
              <h2 className="text-lg font-semibold">{group.name}</h2>
            </Link>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-2">
                <GroupContactCountSvgIcon />
                <p className="text-sm text-gray-600">
                  {group?.enterpriseContacts?.length} {t('card.contacts')}
                </p>
              </div>
              {/* <p className="text-xs text-gray-500">{t('card.code', { code: group.code })}</p> */}
              {/* "code": "Code : {{code}}", */}
              <p className="text-xs text-gray-500">{t('card.code')} { group.code }</p>
              <p className="text-xs text-gray-400">
                {/* {t('card.createdAt', { date: formatDate(group.createdAt) })} */}
                {t('card.createdAt')} { formatDate(group.createdAt) }
              </p>
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
                  <CardContent className="p-2">
                    <Link 
                      href={`/groups/${group.id}`}
                      className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {t('card.viewDetails')}
                    </Link>
                    <button 
                      className="w-full text-left p-2 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => setIsAddContactsModalOpen(true)}
                    >
                      <span className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        {t('card.addContacts')}
                      </span>
                    </button>
                    {!group.archived && (
                      <button 
                        className="w-full text-left p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteGroup(group.id);
                        }}
                      >
                        {t('card.archiveGroup')}
                      </button>
                    )}
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <Dialog open={isAddContactsModalOpen} onOpenChange={setIsAddContactsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <AddContactsToGroupForm 
            group={group} 
            onClose={() => setIsAddContactsModalOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GroupCard;

// import React from 'react';

// import { UserPlus } from 'lucide-react';
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
//   Dialog,
//   DialogContent,
// } from '@/components/ui/dialog';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { useGroups } from '@/hooks/useGroupOps';
// import { formatDate } from '@/lib/formatDate';
// import { GroupType } from '@/types/groups';

// import AddContactsToGroupForm from './forms/AddContactsToGroupForm';

// const GroupCard = ({ group, view }: { group: GroupType; view: 'grid' | 'list' }) => {
//   const [isAddContactsModalOpen, setIsAddContactsModalOpen] = React.useState(false);
//   const { deleteGroup } = useGroups();
//   return (

//     <>
//       <div
//         className={`relative flex items-center p-3 border-2 border-primaryAppearance rounded-[20px] shadow-md transition-transform duration-300 ease-in-out cursor-pointer group ${
//           view === 'list' ? 'flex-row w-full' : 'flex-row w-full'
//         }`}
//       >
//         {/* Avatar */}
//         <div className="rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center text-2xl font-semibold">
//           {group.name.slice(0, 2).toUpperCase()}
//         </div>

//         {/* Content */}
//         <div className={`flex flex-row justify-between items-center w-[80%] ml-4`}>
//           <div className="p-4 rounded-lg">
//             <Link 
//               href={`/groups/${group.id}`}
//             >
//               <h2 className="text-lg font-semibold">{group.name}</h2>
//             </Link>
//             <div className="flex flex-col gap-1">
//               <div className="flex flex-row items-center gap-2">
//                 <GroupContactCountSvgIcon />
//                 <p className="text-sm text-gray-600">
//                   {group?.enterpriseContacts?.length} Contacts
//                 </p>
//               </div>
//               <p className="text-xs text-gray-500">Code: {group.code}</p>
//               <p className="text-xs text-gray-400">
//                 Created: {formatDate(group.createdAt)}
//               </p>
//             </div>
//           </div>

//           {/* View More Popover */}
//           <div>
//             <Popover>
//               <PopoverTrigger>
//                 <GroupContactViewMoreSvgIcon />
//               </PopoverTrigger>
//               <PopoverContent>
//                 <Card>
//                   <CardContent className="p-2">
//                     <Link 
//                       href={`/groups/${group.id}`}
//                       className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
//                     >
//                       View Details
//                     </Link>
//                     <button 
//                       className="w-full text-left p-2 hover:bg-gray-100 rounded-md transition-colors"
//                       onClick={() => setIsAddContactsModalOpen(true)}
//                     >
//                       <span className="flex items-center gap-2">
//                         <UserPlus className="h-4 w-4" />
//                         Add Contacts
//                       </span>
//                     </button>
//                     {!group.archived && (
//                       <button 
//                         className="w-full text-left p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           deleteGroup (group.id);
//                           // Add your archive handler here
//                         }}
//                       >
//                         Archive Group
//                       </button>
//                     )}
//                   </CardContent>
//                 </Card>
//               </PopoverContent>
//             </Popover>
//           </div>
//         </div>

//       </div>
//       <Dialog open={isAddContactsModalOpen} onOpenChange={setIsAddContactsModalOpen}>
//           <DialogContent className="sm:max-w-[500px]">
//               <AddContactsToGroupForm 
//                   group={group} 
//                   onClose={() => setIsAddContactsModalOpen(false)} 
//               />
//           </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default GroupCard;
