import React from 'react';

import OneEtablissementHeader from './_components/OneEtablissementHeader';
import OneEtablissementModule from './_components/OneEtablissementModule';

const OneGroupPage = () => {
  return (
    <div>
        <OneEtablissementHeader />
        <div className='h-full flex flex-col items-center justify-center'>
            <OneEtablissementModule />
        </div>
    </div>
  )
}

export default OneGroupPage