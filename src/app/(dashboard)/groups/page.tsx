import React from 'react';

import GroupHeader from './_components/GroupHeader';
import GroupModule from './_components/GroupModule';

const GroupesPage = () => {
  return (
    <div className='flex flex-col'>
      <GroupHeader />
      <div className='h-full flex flex-col items-center justify-center'>
        <GroupModule />
      </div>
    </div>
  )
}

export default GroupesPage