import React from 'react';

import { SvgLogoIcon } from '@/app/svg_components/SvgIcons';

const LoadingUI = () => {
  return (
    <div className='relative flex items-center justify-center w-full h-screen'>
        <div className="absolute  m-auto w-[1.5rem] h-[1.5rem] animate-spin p-4 rounded-full  border-t-[3px]  border-t-white border-primaryAppearanceLight">
        </div>
        <div className='flex items-center justify-center w-[1rem] h-[1rem] rounded-full'>
            <SvgLogoIcon height='20' width='25' color='white' />
        </div>
    </div>
  )
}

export default LoadingUI