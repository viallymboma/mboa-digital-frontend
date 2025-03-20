"use client";
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import ButtonList from '../../_components/_global/ButtonList';

type BreadcrumbLinkType = {
    label: string;
    href?: string;
};

type GenericPageHeaderProps = {
    title: string;
    breadcrumbLinks: BreadcrumbLinkType[];
    buttons?: {
        dialoContentStyle?: string;
        buttonBg?: string;
        label: string;
        onClick?: () => void;
        icon?: React.ElementType;
        dialogContent?: React.ReactNode;
    }[];
};

const GenericPageHeader: React.FC<GenericPageHeaderProps> = ({ title, breadcrumbLinks, buttons }) => {
    return (
        <div className='flex flex-row justify-between gap-4'>
            <div>
                <h1 className='text-[28px] font-bold'>{title}</h1>
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbLinks.map((link, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    {link.href ? (
                                        <BreadcrumbLink className='text-[14px]' href={link.href}>
                                        {link.label}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>{link.label}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                                {index < breadcrumbLinks.length - 1 && <BreadcrumbSeparator />}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {buttons && buttons.length > 0 && <ButtonList buttons={buttons} />}
        </div>
    );
};

export default GenericPageHeader;
