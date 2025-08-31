"use client";
import React from 'react';

import { X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  icon?: React.ReactNode; // 👈 Add icon support
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const { 
      label, 
      placeholder, 
      type = "text", 
      className, 
      error,
      value = '',
      onChange,
      icon,
      ...restProps 
    } = props;

    return (
      <div className="space-y-2 w-full">
        {label && <label className="block text-[14px] font-medium dark:text-white text-gray-700">{label}</label>}
        
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {icon}
            </span>
          )}
          <Input
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={cn(
              'w-full h-[56px]',
              icon && 'pl-10', // 👈 Add padding if icon exists
              className
            )}
            {...restProps}
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

// Fixed CountrySelect component
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

const CountrySelect = React.forwardRef<
  React.ElementRef<typeof Select>, 
  CountrySelectProps
>(
  (props, ref) => {
    console.log('Props in CountrySelect:', ref);
    const { 
      label, 
      onChange, 
      value, 
      className, 
      error, 
      placeHolder, 
      placeHolderSearch, 
      options, 
      ...restProps 
    } = props;

    const [searchQuery, setSearchQuery] = React.useState('');
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const searchContainerRef = React.useRef<HTMLDivElement>(null);

    // Filter countries based on search (with better matching)
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options;
      
      const query = searchQuery.toLowerCase();
      return options.filter(option =>
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query)
      );
    }, [options, searchQuery]);

    // Find selected option
    const selectedOption = React.useMemo(() => 
      options.find(opt => opt.value === value),
      [options, value]
    );

    const handleSelect = React.useCallback((newValue: string) => {
      onChange(newValue);
      setSearchQuery(''); // Clear search on selection
      setIsOpen(false);
    }, [onChange]);

    // Handle clicks on search container
    const handleSearchContainerClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    // Focus management and search reset
    React.useEffect(() => {
      if (isOpen) {
        setSearchQuery(''); // Reset search when opening
        setTimeout(() => {
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        }, 0);
      }
    }, [isOpen]);

    return (
      <div className="space-y-2 w-full relative">
        {label && (
          <label className="block text-[14px] font-medium text-gray-700 dark:text-white">
            {label}
          </label>
        )}

        {/* Search Input - Moved outside Select */}
        {isOpen && (
          <div 
            ref={searchContainerRef}
            onClick={handleSearchContainerClick}
            onMouseDown={handleSearchContainerClick}
            className="absolute bottom-0 h-[56px] bg-white dark:bg-gray-800 w-full z-10">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder={placeHolderSearch || "Search countries..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[90%]"
              onKeyDown={(e) => {
                // Prevent the default selection behavior
                if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                }
                // Prevent closing on keydown
                e.stopPropagation();
              }}
              // Prevent auto-selection of text
              onSelect={(e) => {
                const target = e.target as HTMLInputElement;
                target.selectionStart = target.selectionEnd;
              }}
              // Ensure cursor is always at the end
              onFocus={(e) => {
                const target = e.target as HTMLInputElement;
                const length = target.value.length;
                target.setSelectionRange(length, length);
              }}
              autoComplete="off"
              aria-label="Search countries"
              autoFocus
            />
          </div>
        )}

        <Select 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // ref={ref as any}
          value={value} 
          onValueChange={handleSelect}
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              // Only clear search when actually selecting an item
              setSearchQuery('');
            }
          }}
          {...restProps}
        >
          <SelectTrigger 
            className={cn(
              "w-full h-[56px] text-left",
              className, 
              error && "border-red-500"
            )}
            aria-expanded={isOpen}
          >
            <SelectValue placeholder={placeHolder || "Select a country"}>
              {selectedOption && (
                <div className="flex items-center gap-2 truncate">
                  {selectedOption.flag && <span>{selectedOption.flag}</span>}
                  <span>{selectedOption.label}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px] p-0">
            {/* Results list */}
            <ScrollArea className="h-[200px]">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center gap-2">
                      {option.flag && <span className="text-lg">{option.flag}</span>}
                      <span className="truncate">{option.label}</span>
                    </div>
                  </SelectItem>
                ))
              ) : (
                <div className="py-4 text-center text-muted-foreground">
                  No countries found
                </div>
              )}
            </ScrollArea>
          </SelectContent>
        </Select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

CountrySelect.displayName = "CountrySelect";

// Fixed AmountInput Component
type AmountInputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  currency?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  (props, ref) => {
    const {
      label,
      placeholder,
      className,
      error,
      currency = "$",
      ...restProps
    } = props;

    return (
      <div className="space-y-2 w-full">
        {label && <label className="block text-[18px] font-medium text-gray-700 dark:text-white">{label}</label>}
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">{currency}</span>
          <Input
            ref={ref}
            type="number"
            placeholder={placeholder}
            className={cn('w-full h-[56px] pl-10', className)}
            {...restProps}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

AmountInput.displayName = 'AmountInput';

// Fixed FormTextArea component
type TextAreaProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      label,
      placeholder,
      className,
      error,
      ...restProps
    } = props;

    return (
      <div className="space-y-2 w-full">
        {label && <label className="block text-[18px] font-medium text-gray-700 dark:text-white">{label}</label>}
        <Textarea
          ref={ref}
          placeholder={placeholder}
          className={cn('w-full h-[120px]', className)}
          {...restProps}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

FormTextArea.displayName = 'FormTextArea';

// SimpleSelect component (doesn't need forwardRef as it uses native select)
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
      <label className="block text-[18px] font-medium text-gray-700 dark:text-white">{label}</label>

      {/* Select Dropdown */}
      <select
        value={value}
        onChange={onChange}
        className="w-full h-[36px] border rounded-md p-2 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600"
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

// MultiSelect component (doesn't need forwardRef as it's a composite component)
type MultiSelectProps = {
  label?: string;
  className?: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: EnterpriseContactResponseType[];
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
      {label && <label className="block text-[18px] font-medium text-gray-700 dark:text-white">{label}</label>}

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
            <div className="p-2 bg-white dark:bg-gray-800 sticky top-0 z-10" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{selectedOption.firstname} {selectedOption.lastname}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(selectedValue);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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

// "use client";
// import React from 'react';

// import { X } from 'lucide-react';

// import { Input } from '@/components/ui/input';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { cn } from '@/lib/utils';
// import { EnterpriseContactResponseType } from '@/types/contact';

// interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   placeholder?: string;
//   type?: string;
//   className?: string;
//   error?: string;
// }

// const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({ 
//   label, 
//   placeholder, 
//   type = "text", 
//   className, 
//   error,
//   value = '', // Add default value
//   onChange,
//   ...props 
// }, ref) => {
//   return (
//     <div className="space-y-2 w-full">
//       {label && <label className="block text-[14px] font-medium dark:text-white text-gray-700">{label}</label>}
//       <Input
//         ref={ref}
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         className={cn('w-full h-[56px]', className)}
//         {...props}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// });

// FormInput.displayName = 'FormInput';


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
//     const searchContainerRef = React.useRef<HTMLDivElement>(null);

//     // Filter countries based on search (with better matching)
//     const filteredOptions = React.useMemo(() => {
//       if (!searchQuery) return options;
      
//       const query = searchQuery.toLowerCase();
//       return options.filter(option =>
//         option.label.toLowerCase().includes(query) ||
//         option.value.toLowerCase().includes(query)
//       );
//     }, [options, searchQuery]);

//     // Find selected option
//     const selectedOption = React.useMemo(() => 
//       options.find(opt => opt.value === value),
//       [options, value]
//     );

//     const handleSelect = React.useCallback((newValue: string) => {
//       onChange(newValue);
//       setSearchQuery(''); // Clear search on selection
//       setIsOpen(false);
//     }, [onChange]);

//     // Handle clicks on search container
//     const handleSearchContainerClick = (e: React.MouseEvent) => {
//       e.stopPropagation();
//       e.preventDefault();
//     };

//     // Focus management and search reset
//     React.useEffect(() => {
//       if (isOpen) {
//         setSearchQuery(''); // Reset search when opening
//         setTimeout(() => {
//           if (searchInputRef.current) {
//             searchInputRef.current.focus();
//           }
//         }, 0);
//       }
//     }, [isOpen]);

//     return (
//       <div className="space-y-2 w-full relative">
//         {label && (
//           <label className="block text-[14px] font-medium text-gray-700">
//             {label}
//           </label>
//         )}

//         {/* Search Input - Moved outside Select */}
//         {isOpen && (
//           <div 
//             ref={searchContainerRef}
//             onClick={handleSearchContainerClick}
//             onMouseDown={handleSearchContainerClick}
//             className=" absolute bottom-0 h-[56px] bg-white w-full z-10">
//             <Input
//               ref={searchInputRef}
//               type="text"
//               placeholder={placeHolderSearch || "Search countries..."}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className=" w-full h-[90%]"
//               // onKeyDown={handleKeyDown}
//               onKeyDown={(e) => {
//                   // Prevent the default selection behavior
//                   if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
//                     e.preventDefault();
//                   }
//                   // Prevent closing on keydown
//                   e.stopPropagation();
//               }}
//               // Prevent auto-selection of text
//               onSelect={(e) => {
//                   const target = e.target as HTMLInputElement;
//                   target.selectionStart = target.selectionEnd;
//               }}
//               // Ensure cursor is always at the end
//               onFocus={(e) => {
//                   const target = e.target as HTMLInputElement;
//                   const length = target.value.length;
//                   target.setSelectionRange(length, length);
//               }}
//               autoComplete="off"
//               aria-label="Search countries"
//               autoFocus
//             />
//           </div>
//         )}

//         <Select 
//           value={value} 
//           onValueChange={handleSelect}
//           open={isOpen}
//           // onOpenChange={setIsOpen}
//           onOpenChange={(open) => {
//             setIsOpen(open);
//             if (!open) {
//               // Only clear search when actually selecting an item
//               setSearchQuery('');
//             }
//           }}
//           {...props}
//         >
//           <SelectTrigger 
//             className={cn(
//               "w-full h-[56px] text-left",
//               className, 
//               error && "border-red-500"
//             )}
//             aria-expanded={isOpen}
//           >
//             <SelectValue placeholder={placeHolder || "Select a country"}>
//               {selectedOption && (
//                 <div className="flex items-center gap-2 truncate">
//                   {selectedOption.flag && <span>{selectedOption.flag}</span>}
//                   <span>{selectedOption.label}</span>
//                 </div>
//               )}
//             </SelectValue>
//           </SelectTrigger>
//           <SelectContent className="max-h-[300px] p-0">
//             {/* Results list */}
//             <ScrollArea className="h-[200px]">
//               {filteredOptions.length > 0 ? (
//                 filteredOptions.map((option) => (
//                   <SelectItem 
//                     key={option.value} 
//                     value={option.value}
//                     className="cursor-pointer hover:bg-accent"
//                   >
//                     <div className="flex items-center gap-2">
//                       {option.flag && <span className="text-lg">{option.flag}</span>}
//                       <span className="truncate">{option.label}</span>
//                     </div>
//                   </SelectItem>
//                 ))
//               ) : (
//                 <div className="py-4 text-center text-muted-foreground">
//                   No countries found
//                 </div>
//               )}
//             </ScrollArea>
//           </SelectContent>
//         </Select>
//         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       </div>
//     );
//   }
// );

// CountrySelect.displayName = "CountrySelect";


// // AmountInput Component
// type AmountInputProps = {
//   label?: string;
//   placeholder?: string;
//   className?: string;
//   error?: string;
//   currency?: string;
// };

// const AmountInput: React.FC<AmountInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
//   label,
//   placeholder,
//   className,
//   error,
//   currency = "$",
//   ...props
// }) => {
//   return (
//     <div className="space-y-2 w-full">
//       {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}
//       <div className="relative">
//         <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">{currency}</span>
//         <Input
//           type="number"
//           placeholder={placeholder}
//           className={cn('w-full h-[56px] pl-10', className)}
//           {...props}
//         />
//       </div>
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// type TextAreaProps = {
//   label?: string;
//   placeholder?: string;
//   className?: string;
//   error?: string;
// };

// const FormTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({
//   label,
//   placeholder,
//   className,
//   error,
//   ...props
// }, ref) => {
//   return (
//     <div className="space-y-2 w-full">
//       {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}
//       <Textarea
//         ref={ref}
//         placeholder={placeholder}
//         className={cn('w-full h-[120px]', className)}
//         {...props}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// });

// FormTextArea.displayName = 'FormTextArea';

// type SelectProps = {
//   label: string;
//   options: { value: string; label: string }[];
//   value: string;
//   onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
//   error?: string;
// };

// const SimpleSelect: React.FC<SelectProps> = ({ label, options, value, onChange, error }) => {
//   return (
//     <div className="space-y-2 w-full">
//       {/* Label */}
//       <label className="block text-[18px] font-medium text-gray-700">{label}</label>

//       {/* Select Dropdown */}
//       <select
//         value={value}
//         onChange={onChange}
//         className="w-full h-[36px] border rounded-md p-2 text-gray-700"
//       >
//         <option value="">Select an option</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>

//       {/* Error message */}
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };


// type MultiSelectProps = {
//   label?: string;
//   className?: string;
//   value: string[];
//   onChange: (value: string[]) => void;
//   options: EnterpriseContactResponseType [];  // { value: string; label: string; flag?: string }[]; 
//   onOpen?: () => void;
//   error?: string;
// };


// const MultiSelect: React.FC<MultiSelectProps> = ({
//   label,
//   className,
//   value,
//   onChange,
//   options,
//   onOpen,
//   error,
// }) => {
//   const [searchQuery, setSearchQuery] = React.useState('');

//   // Handle selection change
//   const handleSelectChange = (selectedValue: string) => {
//     if (!value?.includes(selectedValue)) {
//       onChange([...value, selectedValue]);
//     }
//   };

//   // Handle removal of a selected item
//   const handleRemoveItem = (itemValue: string) => {
//     onChange(value?.filter((val) => val !== itemValue));
//   };

//   // Filter options based on the search query
//   const filteredOptions = options.filter((option) =>
//     option.lastname.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="space-y-2 w-full">
//       {label && <label className="block text-[18px] font-medium text-gray-700">{label}</label>}

//       <div>
//         {/* Select Dropdown */}
//         <Select 
//           onValueChange={handleSelectChange} 
//           onOpenChange={(open) => {
//             if (open && onOpen) {
//               onOpen();
//             }
//           }}
//         >
//           <SelectTrigger className={cn('w-full h-[56px]', className)}>
//             <SelectValue placeholder="Select items" />
//           </SelectTrigger>
//           <SelectContent>
//             {/* Search Input */}
//             <div className="p-2 bg-white sticky top-0 z-10" onClick={(e) => e.stopPropagation()}>
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>

//             {/* Scrollable Options */}
//             <div className="max-h-[200px] overflow-y-auto">
//               {filteredOptions?.map((option) => (
//                 <SelectItem 
//                   key={option.id} 
//                   value={option.id}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <div className="flex items-center justify-between w-full">
//                     <span>{option.firstname} {option.lastname}</span>
//                     {value.includes(option.id) && <span className="tick">✔</span>}
//                   </div>
//                 </SelectItem>
//               ))}
//             </div>
//           </SelectContent>
//         </Select>

//         {/* Display Selected Items */}
//         <div className="flex flex-wrap gap-2 mt-2">
//           {value?.map((selectedValue) => {
//             const selectedOption = options.find((option) => option.id === selectedValue);
//             return (
//               selectedOption && (
//                 <div
//                   key={selectedValue}
//                   className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
//                 >
//                   <span>{selectedOption.firstname} {selectedOption.lastname}</span>
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemoveItem(selectedValue);
//                     }}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               )
//             );
//           })}
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };
// export {
//   AmountInput,
//   CountrySelect,
//   FormInput,
//   FormTextArea,
//   MultiSelect,
//   SimpleSelect,
// };
