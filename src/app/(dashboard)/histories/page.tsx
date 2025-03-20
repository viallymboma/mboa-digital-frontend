import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import HistoriesModule from './_components/HistoriesModule';

const HistoriesPage = () => {
  return (
    <div className=''>
      <div>
        <h1 className='text-[28px] font-bold'>Historique</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className='text-[14px]' href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Historique</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='h-full flex flex-col items-center justify-center'>
        <HistoriesModule />
      </div>
    </div>
  )
}

export default HistoriesPage