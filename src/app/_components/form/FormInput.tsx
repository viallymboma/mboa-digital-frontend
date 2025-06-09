"use client";
import React from 'react';

import { X } from 'lucide-react';

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
import { EnterpriseContactResponseType } from '@/types/contact';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  error?: string;
}

// const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({ 
//   label, 
//   placeholder, 
//   type = "text", 
//   className, 
//   error,
//   ...props 
// }, ref) => {
//   return (
//     <div className="space-y-2 w-full">
//       {label && <label className="block text-[18px] font-medium dark:text-white text-gray-700">{label}</label>}
//       <Input
//         ref={ref}
//         type={type}
//         placeholder={placeholder}
//         className={cn('w-full h-[56px]', className)}
//         {...props}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// });

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({ 
  label, 
  placeholder, 
  type = "text", 
  className, 
  error,
  value = '', // Add default value
  onChange,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[14px] font-medium dark:text-white text-gray-700">{label}</label>}
      <Input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn('w-full h-[56px]', className)}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

FormInput.displayName = 'FormInput';

// // FormInput Component
// type FormInputProps = {
//   label?: string;
//   placeholder?: string;
//   type?: string;
//   className?: string;
//   error?: string;
// };

// const FormInput: React.FC<FormInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ 
//   label, 
//   placeholder, 
//   type = "text", 
//   className, 
//   error, 
//   ...props 
// }) => {
//   return (
//     <div className="space-y-2 w-full">
//       {label && <label className="block text-[18px] font-medium dark:text-white text-gray-700">{label}</label>}
//       <Input
//         type={type}
//         placeholder={placeholder}
//         className={cn('w-full h-[56px]', className)}
//         {...props}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };


// type CountrySelectProps = {
//   label?: string;
//   className?: string;
//   value: string;
//   error?: string;
//   placeHolder?: string;
//   placeHolderSearch?: string;
//   onChange: (value: string) => void;
//   options: { value: string; label: string; flag?: string }[];
// } & Omit<React.ComponentProps<typeof Select>, 'onValueChange' | 'value'>;

// const CountrySelect = React.forwardRef<HTMLSelectElement, CountrySelectProps>(
//   ({ label, onChange, value, className, error, placeHolder, placeHolderSearch, options, ...props }) => {
//     const [searchQuery, setSearchQuery] = React.useState('');
//     const searchInputRef = React.useRef<HTMLInputElement>(null);
//     const [isOpen, setIsOpen] = React.useState(false);

//     // Filter countries based on search
//     const filteredOptions = React.useMemo(() => 
//       options.filter(option =>
//         option.label.toLowerCase().includes(searchQuery.toLowerCase())
//       ), [options, searchQuery]
//     );

//     const selectedLabel = React.useMemo(() => 
//       options.find(opt => opt.value === value)?.label
//     , [options, value]);

//     const handleSelect = React.useCallback((newValue: string) => {
//       onChange(newValue);
//       setSearchQuery('');
//       setIsOpen(false);
//     }, [onChange]);

//     // Focus search input when dropdown opens
//     React.useEffect(() => {
//       if (isOpen) {
//         // Add a small delay to ensure the input is mounted
//         const timeoutId = setTimeout(() => {
//           searchInputRef.current?.focus();
//         }, 50);
//         return () => clearTimeout(timeoutId);
//       }
//     }, [isOpen]);

//     return (
//       <div className="space-y-2 w-full">
//         {label && (
//           <label className="block text-[14px] font-medium text-gray-700">
//             {label}
//           </label>
//         )}
//         <Select 
//           value={value} 
//           onValueChange={handleSelect}
//           open={isOpen}
//           onOpenChange={setIsOpen}
//           {...props}
//         >
//           <SelectTrigger 
//             className={cn("w-full h-[56px]", className, error && "border-red-500")}
//           >
//             <SelectValue placeholder={placeHolder || "Select a country"}>
//               {selectedLabel}
//             </SelectValue>
//           </SelectTrigger>
//           <SelectContent className="max-h-[300px]">
//             <div onPointerDown={(e) => e.stopPropagation()} className="p-2 sticky top-0 bg-white border-b z-10">
//               <Input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder={placeHolderSearch || "Search countries..."}
//                 value={searchQuery}
//                 onChange={(e) => {
//                   // e.stopPropagation();
//                   setSearchQuery(e.target.value);
//                 }}
//                 className="h-8"
//                 onClick={(e) => e.stopPropagation()}
//                 onKeyDown={(e) => {
//                   e.stopPropagation();
//                   if (e.key === 'Escape') {
//                     setIsOpen(false);
//                   }
//                 }}
//               />
//             </div>
//             <div className="overflow-y-auto">
//               {filteredOptions.length > 0 ? (
//                 filteredOptions.map((option) => (
//                   <SelectItem 
//                     key={option.value} 
//                     value={option.value}
//                     className="cursor-pointer hover:bg-gray-100"
//                   >
//                     <div className="flex items-center gap-2">
//                       {option.flag && <span>{option.flag}</span>}
//                       <span>{option.label}</span>
//                     </div>
//                   </SelectItem>
//                 ))
//               ) : (
//                 <div className="py-2 text-center text-gray-500">
//                   No countries found
//                 </div>
//               )}
//             </div>
//           </SelectContent>
//         </Select>
//         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       </div>
//     );
//   }
// );

// CountrySelect.displayName = "CountrySelect";


type CountrySelectProps = {
  label?: string;
  className?: string;
  value: string;
  error?: string;
  placeHolder?: string;
  placeHolderSearch?: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; flag?: string }[];
} & Omit<React.ComponentProps<typeof Select>, 'onValueChange' | 'value'>;

const CountrySelect = React.forwardRef<HTMLSelectElement, CountrySelectProps>(
  ({ label, onChange, value, className, error, placeHolder, placeHolderSearch, options, ...props }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    // Filter countries based on search
    const filteredOptions = React.useMemo(() => 
      options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      ), [options, searchQuery]
    );

    const selectedLabel = React.useMemo(() => 
      options.find(opt => opt.value === value)?.label
    , [options, value]);

    const handleSelect = React.useCallback((newValue: string) => {
      onChange(newValue);
      setSearchQuery('');
      setIsOpen(false);
    }, [onChange]);

    // Focus search input when dropdown opens
    React.useEffect(() => {
      if (isOpen && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen]);

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="block text-[14px] font-medium text-gray-700">
            {label}
          </label>
        )}
        <Select 
          value={value} 
          onValueChange={handleSelect}
          open={isOpen}
          onOpenChange={setIsOpen}
          {...props}
        >
          <SelectTrigger 
            className={cn("w-full h-[56px]", className, error && "border-red-500")}
          >
            <SelectValue placeholder={placeHolder || "Select a country"}>
              {selectedLabel}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <div className="p-2 sticky top-0 bg-white border-b z-10">
              <Input
                ref={searchInputRef}
                type="text"
                placeholder={placeHolderSearch || "Search countries..."}
                value={searchQuery}
                onChange={(e) => {
                  console.log('Search input changed:', e.target.value);
                  setSearchQuery(e.target.value);
                }}
                className="h-8 pointer-events-auto"
                disabled={false}
                onKeyDown={(e) => {
                  console.log('Key pressed:', e.key);
                  if (e.key === 'Escape') {
                    setIsOpen(false);
                  }
                }}
              />
            </div>
            <div className="overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      {option.flag && <span>{option.flag}</span>}
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))
              ) : (
                <div className="py-2 text-center text-gray-500">
                  No countries found
                </div>
              )}
            </div>
          </SelectContent>
        </Select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

CountrySelect.displayName = "CountrySelect";


// type CountrySelectProps = {
//   label?: string;
//   className?: string;
//   value: string;
//   error?: string;
//   onChange: (value: string) => void;
//   options: { value: string; label: string; flag?: string }[];
// };

// const CountrySelect = React.forwardRef<HTMLSelectElement, CountrySelectProps>(
//   ({ label, onChange, value, className, error, options }) => {
//     const [searchQuery, setSearchQuery] = React.useState('');

//     // Filter countries based on search
//     const filteredOptions = options.filter(option =>
//       option.label.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleSelect = (newValue: string) => {
//       // Direct value handling instead of synthetic event
//       onChange(newValue);
//     };

//     return (
//       <div className="space-y-2 w-full">
//         {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}
//         <Select value={value} onValueChange={handleSelect}>
//           <SelectTrigger className={cn("w-full h-[56px]", className)}>
//             <SelectValue placeholder="Select a country">
//               {value && options.find(opt => opt.value === value)?.label}
//             </SelectValue>
//           </SelectTrigger>
//           <SelectContent className="max-h-[300px]">
//             <div className="p-2 sticky top-0 bg-white border-b">
//               <Input
//                 type="text"
//                 placeholder="Search countries..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="h-8"
//               />
//             </div>
//             <div className="overflow-y-auto">
//               {filteredOptions.map((option) => (
//                 <SelectItem 
//                   key={option.value} 
//                   value={option.value}
//                   className="cursor-pointer hover:bg-gray-100"
//                 >
//                   <div className="flex items-center gap-2">
//                     {option.flag && <span>{option.flag}</span>}
//                     <span>{option.label}</span>
//                   </div>
//                 </SelectItem>
//               ))}
//             </div>
//           </SelectContent>
//         </Select>
//         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       </div>
//     );
//   }
// );
// CountrySelect.displayName = "CountrySelect";


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
// type TextAreaProps = {
//   label?: string;
//   placeholder?: string;
//   className?: string;
//   error?: string;
// };

// const FormTextArea: React.FC<TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
//   label,
//   placeholder,
//   className,
//   error,
//   ...props
// }) => {
//   return (
//     <div className="space-y-2 w-full">
//       {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}
//       <Textarea
//         placeholder={placeholder}
//         className={cn('w-full h-[120px]', className)}
//         {...props}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
};

const FormTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({
  label,
  placeholder,
  className,
  error,
  ...props
}, ref) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}
      <Textarea
        ref={ref}
        placeholder={placeholder}
        className={cn('w-full h-[120px]', className)}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

FormTextArea.displayName = 'FormTextArea';

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


type MultiSelectProps = {
  label?: string;
  className?: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: EnterpriseContactResponseType [];  // { value: string; label: string; flag?: string }[]; 
  onOpen?: () => void;
  error?: string;
};


const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  className,
  value,
  onChange,
  options,
  onOpen,
  error,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Handle selection change
  const handleSelectChange = (selectedValue: string) => {
    if (!value?.includes(selectedValue)) {
      onChange([...value, selectedValue]);
    }
  };

  // Handle removal of a selected item
  const handleRemoveItem = (itemValue: string) => {
    onChange(value?.filter((val) => val !== itemValue));
  };

  // Filter options based on the search query
  const filteredOptions = options.filter((option) =>
    option.lastname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}

      <div>
        {/* Select Dropdown */}
        <Select 
          onValueChange={handleSelectChange} 
          onOpenChange={(open) => {
            if (open && onOpen) {
              onOpen();
            }
          }}
        >
          <SelectTrigger className={cn('w-full h-[56px]', className)}>
            <SelectValue placeholder="Select items" />
          </SelectTrigger>
          <SelectContent>
            {/* Search Input */}
            <div className="p-2 bg-white sticky top-0 z-10" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Scrollable Options */}
            <div className="max-h-[200px] overflow-y-auto">
              {filteredOptions?.map((option) => (
                <SelectItem 
                  key={option.id} 
                  value={option.id}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option.firstname} {option.lastname}</span>
                    {value.includes(option.id) && <span className="tick">✔</span>}
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>

        {/* Display Selected Items */}
        <div className="flex flex-wrap gap-2 mt-2">
          {value?.map((selectedValue) => {
            const selectedOption = options.find((option) => option.id === selectedValue);
            return (
              selectedOption && (
                <div
                  key={selectedValue}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  <span>{selectedOption.firstname} {selectedOption.lastname}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(selectedValue);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )
            );
          })}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
export {
  AmountInput,
  CountrySelect,
  FormInput,
  FormTextArea,
  MultiSelect,
  SimpleSelect,
};
