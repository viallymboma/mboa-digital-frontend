"use client"
import React from 'react';

import { useTranslation } from 'react-i18next';

import { EditSvgIcon } from '@/app/svg_components/SvgIcons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import CreateContactForm from '../../contacts/_component/CreateContactForm';

const BreadCrumbModule = () => {
    const { t } = useTranslation();
    return (
        <div className='flex flex-row justify-between items-center '>
            <div className=''>
                <h1 className='text-[28px] font-bold'>{t("profile.pageTitle")}</h1>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-[14px]' href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{t("profile.pageTitle")}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Dialog>
                <DialogTrigger className='' asChild>
                    <Button className={`bg-primaryAppearance p-[1.2rem]`}>
                        <EditSvgIcon />
                        <span className='text-[14px] text-white'>{t("profile.editProfileButton")}</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className={ "sm:max-w-[425px]" }>
                    <DialogHeader>
                        <DialogTitle className='text-[28px]'>Editer votre profiles</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <CreateContactForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BreadCrumbModule