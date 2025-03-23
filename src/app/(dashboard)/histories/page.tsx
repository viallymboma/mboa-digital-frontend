import React from 'react';

import HistoriesModule from './_components/HistoriesModule';
import HistoriesPageHeader from './_components/HistoriesPageHeader';

const HistoriesPage = () => {
  return (
    <div className=''>
      <HistoriesPageHeader />
      <div className='h-full flex flex-col items-center justify-center'>
        <HistoriesModule />
      </div>
    </div>
  )
}

export default HistoriesPage