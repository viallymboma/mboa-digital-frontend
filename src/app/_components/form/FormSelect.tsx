"use client";
import {
  Controller,
  RegisterOptions,
  useForm,
} from 'react-hook-form';

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { SelectContent } from '@radix-ui/react-select';

type SelectProps = {
    name: string;
    label?: string;
    options: { value: string; label: string }[];
    validation?: RegisterOptions;
    className?: string;
};

export const FormSelect = ({ name, label, options, validation, className }: SelectProps) => {
    // const {
    //     control,
    //     formState: { errors },
    // } = useFormContext();

    const { control, formState: {errors} } = useForm();

    return (
        <div className="space-y-2">
        {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
        <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={cn('w-full', className)}>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                        {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            )}
        />
        {errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
        )}
        </div>
    );
};











// import {
//   RegisterOptions,
//   useFormContext,
// } from 'react-hook-form';

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { cn } from '@/lib/utils';

// type SelectProps = {
//     name: string;
//     label?: string;
//     options: { value: string; label: string }[];
//     validation?: RegisterOptions;
//     className?: string;
// };

// export const FormSelect = ({ name, label, options, validation, className }: SelectProps) => {
//     const {
//         register,
//         formState: { errors },
//     } = useFormContext();

//     return (
//         <div className="space-y-2">
//         {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
//         <Select {...register(name, validation)}>
//             <SelectTrigger className={cn('w-full', className)}>
//             <SelectValue placeholder="Select an option" />
//             </SelectTrigger>
//             <SelectContent>
//             {options.map((option) => (
//                 <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//                 </SelectItem>
//             ))}
//             </SelectContent>
//         </Select>
//         {errors[name] && (
//             <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
//         )}
//         </div>
//     );
// };