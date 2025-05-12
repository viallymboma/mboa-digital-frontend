import React from 'react';

import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive';
import { SectionCards } from '@/components/ui/section-cards';

// import FIrstSection from './_sections/FIrstSection';
// import SecondSection from './_sections/SecondSection';

const DashboardModule = () => {
  return (
    <div className='py-4 flex flex-col gap-4 md:gap-6 md:py-6'>
        {/* <FIrstSection />
        <SecondSection /> */}
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
    </div>
  )
}

export default DashboardModule