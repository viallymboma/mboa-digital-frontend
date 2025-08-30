"use client"
import '../../i18n'; // Import before using `useTranslation`

import React from 'react';

import ThemeSwitcher from '../(dashboard)/_components/ThemeSwitcher';

// import LanguageSwitcher from '../_components/LanguageSwitcher';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative'>
            <div className='absolute right-0 p-4'>
                <div className='flex flex-row gap-4'>   
                    {/* <LanguageSwitcher /> */}
                    <ThemeSwitcher />
                </div>
            </div>
            { children}
        </div>
    )
}

export default layout