import React from 'react';

import LanguageSwitcher from '../_components/LanguageSwitcher';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative'>
            <div className='absolute right-0 p-4'>
                <LanguageSwitcher />
            </div>
            { children}
        </div>
    )
}

export default layout