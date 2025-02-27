"use client";

import { ReactNode } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const SearchInput = ({ leftIcon, rightIcon, className, ...props }: SearchInputProps) => {
  return (
    <div className="relative w-full">
      {/* Left Icon */}
      {leftIcon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {leftIcon}
        </span>
      )}

      {/* Input Field */}
      <Input
        className={cn(
          "w-full py-2 pl-10 pr-10 rounded-md border focus:ring-2 focus:ring-primary",
          leftIcon && "pl-10", // Adjust padding when left icon is present
          rightIcon && "pr-10", // Adjust padding when right icon is present
          className
        )}
        {...props}
      />

      {/* Right Icon */}
      {rightIcon && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {rightIcon}
        </span>
      )}
    </div>
  );
};

export default SearchInput;
