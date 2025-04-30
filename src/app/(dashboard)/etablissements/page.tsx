import React from 'react';

import EtablissementHeader from './_components/EtablissementHeader';
import EtablissementModule from './_components/EtablissementModule';

const GroupesPage = () => {
  return (
    <div className=''>
      <EtablissementHeader />
      <div className='h-full flex flex-col items-center justify-center'>
        <EtablissementModule />
      </div>
    </div>
  )
}

export default GroupesPage