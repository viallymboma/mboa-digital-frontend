import React, { useState } from 'react';

import {
  Grid,
  List,
  Search,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGroupStore } from '@/stores/groups.store';

import GroupCard from './GroupCard';

const GroupsGrid = () => {
  const t = useTranslations('group.grid');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const { groups } = useGroupStore();

  // Filtered Data
  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || group.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArchived = showArchived ? true : !group.archived;
    return matchesSearch && matchesArchived;
  });

  return (
    <div className="py-4 w-full">
      {/* Controls */}
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? t('hideArchived') : t('showArchived')}
          </Button>

          <Button 
            variant="outline" 
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
          >
            {view === 'grid' ? <List size={18} /> : <Grid size={18} />}
            {view === 'grid' ? t('listView') : t('gridView')}
          </Button>

          <Button 
            variant="destructive" 
            onClick={() => {
              setSearchQuery('');
              setShowArchived(false);
            }}
          >
            <X size={18} />
            {t('clearFilters')}
          </Button>
        </div>
      </div>

      {/* Group List */}
      <div className='h-[700px] overflow-auto'>
        <div className={`${
          view === 'grid' 
            ? 'grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4' 
            : 'flex flex-col gap-4'
        }`}>
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} view={view} />
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">{t('noGroupsFound')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsGrid;

// import React, { useState } from 'react';

// import {
//   Grid,
//   List,
//   Search,
//   X,
// } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useGroupStore } from '@/stores/groups.store';

// import GroupCard from './GroupCard';

// const GroupsGrid = () => {
//   const [view, setView] = useState<'grid' | 'list'>('grid');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showArchived, setShowArchived] = useState(false);

//   const { groups } = useGroupStore();

//   // Filtered Data
//   const filteredGroups = groups.filter((group) => {
//     const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || group.code.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesArchived = showArchived ? true : !group.archived;
//     return matchesSearch && matchesArchived;
//   });

//   return (
//     <div className="py-4 w-full">
//       {/* Controls */}
//       <div className="flex flex-wrap justify-between gap-4 mb-4">
//         {/* Search */}
//         <div className="relative w-full md:w-1/3">
//           <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//           <Input
//             type="text"
//             placeholder="Search by name or code..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         {/* Actions */}
//         <div className="flex gap-2">
//           <Button 
//             variant="outline" 
//             onClick={() => setShowArchived(!showArchived)}
//           >
//             {showArchived ? 'Hide Archived' : 'Show Archived'}
//           </Button>

//           <Button 
//             variant="outline" 
//             onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
//           >
//             {view === 'grid' ? <List size={18} /> : <Grid size={18} />}
//             {view === 'grid' ? 'List View' : 'Grid View'}
//           </Button>

//           <Button 
//             variant="destructive" 
//             onClick={() => {
//               setSearchQuery('');
//               setShowArchived(false);
//             }}
//           >
//             <X size={18} />
//             Clear Filters
//           </Button>
//         </div>
//       </div>

//       {/* Group List */}
//       <div className='h-[700px] overflow-auto'>
//         <div className={`${
//           view === 'grid' 
//             ? 'grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4' 
//             : 'flex flex-col gap-4'
//         }`}>
//           {filteredGroups.length > 0 ? (
//             filteredGroups.map((group) => (
//               <GroupCard key={group.id} group={group} view={view} />
//             ))
//           ) : (
//             <p className="text-gray-500 text-center w-full">No groups found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GroupsGrid;
