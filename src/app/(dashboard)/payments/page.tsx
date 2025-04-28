import React from 'react';

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
import PaymentModule from './_components/PaymentModule';
import PaymentsPageHeader from './_components/PaymentsPageHeader';

const PaymentsPage = () => {
  return (
    <div className=''>
      {/* <div>
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
      </div> */}
      <PaymentsPageHeader />
      <div className='h-full flex flex-col items-center justify-center'>
        <PaymentModule />
      </div>
    </div>
  )
}

export default PaymentsPage