import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import RechargesModule from './_components/RechargesModule';

const RechargesPage = () => {
  return (
    <div className='p-4'>
      <div>
        <h1 className='text-[28px] font-bold'>Recharges</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className='text-[14px]' href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recharges</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='h-full flex flex-col items-center justify-center'>
        <RechargesModule />
      </div>
    </div>
  )
}

export default RechargesPage