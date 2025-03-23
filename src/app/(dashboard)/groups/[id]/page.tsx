import React from 'react';

import OneGroupHeader from './_components/OneGroupHeader';
import OneGroupModule from './_components/OneGroupModule';

const OneGroupPage = () => {
  return (
    <div>
        <OneGroupHeader />
        <div className='h-full flex flex-col items-center justify-center'>
            <OneGroupModule />
        </div>
    </div>
  )
}

export default OneGroupPage