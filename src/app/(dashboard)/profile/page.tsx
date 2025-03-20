"use client";
import React from 'react';

import BreadCrumbModule from './_components/BreadCrumbModule';
import ProfileModule from './_components/ProfileModule';

const ProfilePage = () => {
  // const { t } = useTranslation();
  return (
    <div className='p-4'>
      <BreadCrumbModule />
      <div className='h-full flex flex-col items-center justify-center'>
        <ProfileModule />
      </div>
    </div>
  )
}

export default ProfilePage