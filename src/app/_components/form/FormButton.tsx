"use client";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string;
};

export const FormButton = ({ children, className, ...props }: ButtonProps) => {
    return (
        <Button
            className={cn('w-full', className)}
            
            {...props}
        >
            {children}
        </Button>
    );
};