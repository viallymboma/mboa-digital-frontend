"use client";
import {
  RegisterOptions,
  useForm,
} from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  validation?: RegisterOptions;
  className?: string;
};

const FormInput = ({ name, label, validation, className, ...props }: InputProps) => {
  const { register, formState: {errors} } = useForm();

  return (
    <div className="space-y-2">
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
      <Input
        id={name}
        {...register(name, validation)}
        className={cn('w-full', className)}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}

export default FormInput