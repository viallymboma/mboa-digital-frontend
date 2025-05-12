"use client";
import React from 'react';

import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

import { AppSidebar } from '../_components/AppSideBar';
import DahsboardHeader from '../_components/DahsboardHeader';

const DashboardLayout = ({ children }: { children: React.ReactNode } ) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='flex flex-col h-screen'>
                <DahsboardHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-[2rem] overflow-auto">
                    { children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout