import {
  type ClassValue,
  clsx,
} from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const countCharacters = (text: string) => {
  if (!text) return { total: 0, special: 0, specialCount: 0 };
  
  // Define special characters that count as 2
  const specialChars = /[^a-zA-Z0-9\s]/g;
  
  const specialMatches = text.match(specialChars) || [];
  const specialCount = specialMatches.length;
  
  // Total count (regular chars + extra count for special chars)
  const total = text.length + specialCount;
  
  return {
      total,
      special: specialCount,
      specialCount: specialCount * 2
  };
};