import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import GroupModule from './_components/GroupModule';

const GroupesPage = () => {
  return (
    <div className=''>
      <div>
        <h1 className='text-[28px] font-bold'>Mes Groupes</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className='text-[14px]' href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Mes groupes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='h-full flex flex-col items-center justify-center'>
        <GroupModule />
      </div>
    </div>
  )
}

export default GroupesPage