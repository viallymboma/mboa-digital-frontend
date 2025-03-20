"use client";
import React from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// FormInput Component
type FormInputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  error?: string;
};

const FormInput: React.FC<FormInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ 
  label, 
  placeholder, 
  type = "text", 
  className, 
  error, 
  ...props 
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}
      <Input
        type={type}
        placeholder={placeholder}
        className={cn('w-full h-[56px]', className)}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// CountrySelect Component
type CountrySelectProps = {
  label?: string;
  className?: string;
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string; flag?: string }[];
};

const CountrySelect: React.FC<CountrySelectProps> = ({ label, onChange, value, className, error, options, ...props }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Filter countries based on the search query
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}
      <Select value={ value } {...props}>
        <SelectTrigger className={cn("w-full h-[56px]", className)}>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {/* Fixed search input field */}
          <div className="p-2 bg-white sticky top-0 z-10">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Scrollable options */}
          <div className="max-h-[200px] overflow-y-auto">
            {filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} onClick={() => onChange({ target: { value: option.value } } as React.ChangeEvent<HTMLSelectElement>)}>
                <div className="flex items-center">
                  <span className="mr-2">{option.flag}</span> {/* Display flag icon */}
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};


// AmountInput Component
type AmountInputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  currency?: string;
};

const AmountInput: React.FC<AmountInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  placeholder,
  className,
  error,
  currency = "$",
  ...props
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">{currency}</span>
        <Input
          type="number"
          placeholder={placeholder}
          className={cn('w-full h-[56px] pl-10', className)}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// TextArea Component
type TextAreaProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
};

const FormTextArea: React.FC<TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  label,
  placeholder,
  className,
  error,
  ...props
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}
      <Textarea
        placeholder={placeholder}
        className={cn('w-full h-[120px]', className)}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

type SelectProps = {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
};

const SimpleSelect: React.FC<SelectProps> = ({ label, options, value, onChange, error }) => {
  return (
    <div className="space-y-2 w-full">
      {/* Label */}
      <label className="block text-[18px] font-medium text-gray-700">{label}</label>

      {/* Select Dropdown */}
      <select
        value={value}
        onChange={onChange}
        className="w-full h-[36px] border rounded-md p-2 text-gray-700"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export { AmountInput, CountrySelect, FormInput, FormTextArea, SimpleSelect };

// "use client";
// import React from 'react';

// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { cn } from '@/lib/utils';

// // FormInput Component
// type FormInputProps = {
//   label?: string;
//   placeholder?: string;
//   type?: string;
//   className?: string;
//   error?: string;
// };

// const FormInput = React.forwardRef<
//   HTMLInputElement,
//   FormInputProps & React.InputHTMLAttributes<HTMLInputElement>
// >(({ label, placeholder, type = "text", className, error, ...props }, ref) => {
//   return (
//     <div className="space-y-2 w-full">
//       {label && (
//         <label className="block text-[18px] font-medium text-gray-700">
//           {label}
//         </label>
//       )}
//       <Input
//         ref={ref}
//         type={type}
//         placeholder={placeholder}
//         className={cn("w-full h-[56px]", className)}
//         {...props}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// });
// FormInput.displayName = "FormInput";

// // AmountInput Component
// type AmountInputProps = {
//   label?: string;
//   placeholder?: string;
//   className?: string;
//   error?: string;
//   currency?: string;
// };

// const AmountInput = React.forwardRef<
//   HTMLInputElement,
//   AmountInputProps & React.InputHTMLAttributes<HTMLInputElement>
// >(({ label, placeholder, className, error, currency = "$", ...props }, ref) => {
//   return (
//     <div className="space-y-2 w-full">
//       {label && (
//         <label className="block text-[18px] font-medium text-gray-700">
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
//           {currency}
//         </span>
//         <Input
//           ref={ref}
//           type="number"
//           placeholder={placeholder}
//           className={cn("w-full h-[56px] pl-10", className)}
//           {...props}
//         />
//       </div>
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// });
// AmountInput.displayName = "AmountInput";

// // CountrySelect Component
// type CountrySelectProps = {
//   label?: string;
//   className?: string;
//   error?: string;
//   options: { value: string; label: string; flag: string }[];
// };

// const CountrySelect = React.forwardRef<HTMLSelectElement, CountrySelectProps>(
//   ({ label, className, error, options, ...props }) => {
//     const [searchQuery, setSearchQuery] = React.useState("");

//     const filteredOptions = options.filter((option) =>
//       option.label.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//       <div className="space-y-2 w-full">
//         {label && (
//           <label className="block text-[18px] font-medium text-gray-700">
//             {label}
//           </label>
//         )}
//         <div>
//         <Select {...props}>
//           <SelectTrigger className={cn("w-full h-[56px]", className)}>
//             <SelectValue placeholder="Select a country" />
//           </SelectTrigger>
//           <SelectContent>
//             <div className="p-2 bg-white sticky top-0 z-10">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div className="max-h-[200px] overflow-y-auto">
//               {filteredOptions.map((option) => (
//                 <SelectItem key={option.value} value={option.value}>
//                   <div className="flex items-center">
//                     <span className="mr-2">{option.flag}</span>
//                     {option.label}
//                   </div>
//                 </SelectItem>
//               ))}
//             </div>
//           </SelectContent>
//         </Select>
//         </div>
//         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       </div>
//     );
//   }
// );
// CountrySelect.displayName = "CountrySelect";

// // FormTextArea Component
// type TextAreaProps = {
//   label?: string;
//   placeholder?: string;
//   className?: string;
//   error?: string;
// };

// const FormTextArea = React.forwardRef<
//   HTMLTextAreaElement,
//   TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
// >(({ label, placeholder, className, error, ...props }, ref) => {
//   return (
//     <div className="space-y-2 w-full">
//       {label && (
//         <label className="block text-[18px] font-medium text-gray-700">
//           {label}
//         </label>
//       )}
//       <Textarea
//         ref={ref}
//         placeholder={placeholder}
//         className={cn("w-full h-[120px]", className)}
//         {...props}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// });
// FormTextArea.displayName = "FormTextArea";

// // Export all components from the same file
// export { AmountInput, CountrySelect, FormInput, FormTextArea };