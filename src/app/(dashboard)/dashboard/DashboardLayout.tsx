"use client";
import React from 'react';

import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

import { AppSidebar } from '../_components/AppSideBar';
import DahsboardHeader from '../_components/DahsboardHeader';

const DashboardLayout = ({ children }: { children: React.ReactNode } ) => {
    // const { t } = useTranslation();
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* <header className="border-[10px] border-black flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                                <LanguageSwitcher />
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header> */}
                <DahsboardHeader />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    </div>
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
                    { children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout