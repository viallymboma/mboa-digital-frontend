"use client";
import React, { ElementType } from 'react';

import { useTranslation } from 'react-i18next';

import ButtonList from './ButtonList';

interface EmptyStateUIProps {
  SvgIcon: ElementType; 
  // # React.FC<{ color?: string; height?: number; width?: number }>;
  mainTitle: string;
  secondTitle: string;
  buttons: {
    dialoContentStyle?: string; 
    buttonBg?: string;
    label: string;
    onClick?: () => void;
    icon?: ElementType; 
    // React.FC<{ color?: string; height?: number; width?: number }>;
    dialogContent?: React.ReactNode;
  }[];
}

const EmptyStateUI: React.FC<EmptyStateUIProps> = ({ SvgIcon, mainTitle, secondTitle, buttons }) => {
  const { t } = useTranslation();

  return (
    <>
      <SvgIcon />
      <div className='w-[30%] text-center'>
        <h1 className='text-[34px] font-bold'>{t(mainTitle)}</h1>
      </div>
      <div className='w-[20%] text-center mt-1'>
        <p className='text-[18px]'>{t(secondTitle)}</p>
      </div>
      <ButtonList buttons={buttons} />
    </>
  );
};

export default EmptyStateUI;












// import React, { ElementType } from 'react';

// type EmptyProps = {
//   icon: ElementType;
//   bigTitle?: boolean;
//   smallTitle?: string;
//   buttons?: React.ReactNode [];
// }

// const EmptyUI: React.FC <EmptyProps> = ({ bigTitle, smallTitle, buttons, icon }) => {
//   return (
//     <div>
        
//     </div>
//   )
// }

// export default EmptyUI