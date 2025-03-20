"use client";
import React, { ElementType } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ButtonsListProps = {
    buttons: {
        dialoContentStyle?: string; 
        buttonBg?: string;
        label: string;
        onClick?: () => void;
        icon?: ElementType; 
        // React.FC<{ color?: string; height?: number; width?: number }>;
        dialogContent?: React.ReactNode;
    }[];
}

const ButtonList: React.FC<ButtonsListProps> = ({ buttons }) => {
    const { t } = useTranslation();
    return (
        <div className='mt-5 flex flex-row gap-4'>
            {buttons.map((button, index) => (
                <Dialog key={index}>
                    <DialogTrigger asChild>
                        <Button className={`${ button?.buttonBg ? button?.buttonBg : "bg-primaryAppearance" } p-[1.2rem]`} onClick={button.onClick}>
                            {button.icon && <button.icon />}
                            <span className='text-[14px] text-white'>{t(button.label)}</span>
                        </Button>
                    </DialogTrigger>
                    {button.dialogContent && (
                        <DialogContent className={ button.dialoContentStyle }>
                            <DialogHeader>
                                <DialogTitle className='text-[28px]'>{t(button.label)}</DialogTitle>
                                <DialogDescription>
                                {/* Additional description if needed */}
                                </DialogDescription>
                            </DialogHeader>
                            {button.dialogContent}
                        </DialogContent>
                    )}
                </Dialog>
            ))}
        </div>
    )
}

export default ButtonList