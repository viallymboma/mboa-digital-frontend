import React from 'react';

import ContactModule from './_component/ContactModule';
import ContactPageHeader from './_component/ContactPageHeader';

const ContactPage = () => {
  return (
    <div className='flex flex-col'>
      <ContactPageHeader />
      <div className='h-full flex flex-col items-center justify-center'>
        <ContactModule />
      </div>
    </div>
  )
}

export default ContactPage