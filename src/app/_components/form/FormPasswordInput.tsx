"use client";
import React, { useState } from 'react';

import {
  Eye,
  EyeOff,
} from 'lucide-react';

// import {
//   RegisterOptions,
//   useForm,
// } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormPasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string;
}

const FormPasswordInput = React.forwardRef<HTMLInputElement, FormPasswordInputProps>(({
  label,
  className,
  error,
  value = '', // Add default value
  onChange,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[14px] font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <Input
          // ref={ref}
          // type={showPassword ? "text" : "password"}
          // className={cn('w-full h-[56px] pr-10', className)}
          // {...props}
                    ref={ref}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={cn('w-full h-[56px] pr-10', className)}
          {...props}
        />
        <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

FormPasswordInput.displayName = 'FormPasswordInput';

export { FormPasswordInput };

// type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
//     name: string;
//     label?: string;
//     validation?: RegisterOptions;
//     className?: string;
//     placeHolder?: string;
//     error?: string
// };

// const FormPasswordInput = ({ name, label, placeHolder, validation, className, error, ...props }: PasswordInputProps) => {

//     const { register, formState: {errors} } = useForm();
//     const [showPassword, setShowPassword] = useState(false);

//     return (
//         <div className="space-y-2">
//             {label && <label htmlFor={name} className="block text-[18px] font-medium dark:text-white text-gray-700">{label}</label>}
//             <div className="relative">
//                 <Input
//                     id={name}
//                     type={showPassword ? 'text' : 'password'}
//                     {...register(name, validation)}
//                     className={cn('w-full pr-10', className)}
//                     {...props}
//                     placeholder={ placeHolder }
//                 />
//                 <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-2 top-1/2 -translate-y-1/2"
//                     onClick={() => setShowPassword(!showPassword)}
//                 >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </Button>
//             </div>
//             {
//                 // Display error message if validation fails
//                 error && (
//                     <p className="text-red-500 text-sm mt-1">{error as string}</p>
//                 )
//             }
//             {errors[name] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
//             )}
//         </div>
//     );
// };

// export default FormPasswordInput; 