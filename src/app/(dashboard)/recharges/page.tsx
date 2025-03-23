import React from 'react';

import RechargesModule from './_components/RechargesModule';
import RechargesPageHeader from './_components/RechargesPageHeader';

const RechargesPage = () => {
  return (
    <div className=''>
      <RechargesPageHeader />
      <div className='h-full flex flex-col items-center justify-center'>
        <RechargesModule />
      </div>
    </div>
  )
}

export default RechargesPage