"use client";
import {
  RegisterOptions,
  useForm,
} from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label?: string;
    validation?: RegisterOptions;
    className?: string;
    placeHolder?: string; 
};

export const FormTextArea = ({ name, label, placeHolder, validation, className, ...props }: TextAreaProps) => {

    const { register, formState: {errors} } = useForm();

    return (
        <div className="space-y-2">
            {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
            <Textarea
                id={name}
                {...register(name, validation)}
                className={cn('w-full', className)}
                placeholder={placeHolder }
                {...props}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
            )}
        </div>
    );
};