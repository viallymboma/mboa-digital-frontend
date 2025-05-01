import React, { useState } from 'react';

import {
  Grid,
  List,
  Search,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import GroupCard from './GroupCard';
import { groupData } from './GroupePageSampleData';

const GroupsGrid = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [minContacts, setMinContacts] = useState('');

  // Filtered Data
  const filteredGroups = groupData.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!minContacts || group.contactCount >= parseInt(minContacts, 10))
  );

  return (
    <div className="py-4 w-full ">
      {/* Controls */}
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter by Contact Count */}
        <div className="relative w-full md:w-1/3">
          <Input
            type="number"
            placeholder="Min contacts..."
            value={minContacts}
            onChange={(e) => setMinContacts(e.target.value)}
            className="pl-4"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
            {view === 'grid' ? <List size={18} /> : <Grid size={18} />}
            {view === 'grid' ? 'List View' : 'Grid View'}
          </Button>

          <Button variant="destructive" onClick={() => {
            setSearchQuery('');
            setMinContacts('');
          }}>
            <X size={18} />
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Group List */}
      <div className='h-[700px] overflow-auto'>
        <div className={`${view === 'grid' ? 'grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4' : 'flex flex-col gap-4' }`}>
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => <GroupCard key={group.id} group={group} view={view} />)
          ) : (
            <p className="text-gray-500 text-center w-full">No groups found.</p>
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
// } from 'lucide-react';

// import { Button } from '@/components/ui/button';

// import GroupCard from './GroupCard';
// import { groupData } from './GroupePageSampleData';

// const GroupsGrid = () => {
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   return (
//     <div className="p-4 w-full h-[700px] overflow-auto">
//       {/* Toggle Button */}
//       <div className="flex justify-end mb-4">
//         <Button
//           variant="outline"
//           onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
//           className="flex items-center gap-2"
//         >
//           {view === 'grid' ? <List size={18} /> : <Grid size={18} />}
//           {view === 'grid' ? 'List View' : 'Grid View'}
//         </Button>
//       </div>

//       {/* Dynamic Layout */}
//       <div className={view === 'grid' ? 'grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4' : 'flex flex-col gap-4'}>
//         {groupData.map((group) => (
//           <GroupCard key={group.id} group={group} view={view} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GroupsGrid;

















// import React from 'react';

// import GroupCard from './GroupCard';
// import { groupData } from './GroupePageSampleData';

// const GroupsGrid = () => {
//   return (
//     <div className="p-4 w-full ">
//       <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
//         {groupData.map((group) => (
//           <GroupCard key={group.id} group={group} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GroupsGrid;










// import React from 'react';

// import GroupCard from './GroupCard';
// import { groupData } from './GroupePageSampleData';

// const GroupsGrid = () => {
//   return (
//     <div className="p-4 w-full">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {groupData.map((group) => (
//           <GroupCard key={group.id} group={group} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default GroupsGrid