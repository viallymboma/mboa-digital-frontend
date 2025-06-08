import React from 'react';

import UsersModule from './_components/UsersModule';
import UsersPageHeader from './_components/UsersPageHeader';

const ContactPage = () => {
  return (
    <div className='flex flex-col'>
      <UsersPageHeader />
      <div className='h-full flex flex-col items-center justify-center'>
        <UsersModule />
      </div>
    </div>
  )
}

export default ContactPage