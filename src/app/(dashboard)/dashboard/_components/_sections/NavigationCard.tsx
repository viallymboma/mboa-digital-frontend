"use client";

// import { LucideIcon } from 'lucide-react';

import { ElementType } from 'react';

// import { SvgIconProp } from '@/app/svg_components/SvgIcons';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NavigationCardProps {
  icon: ElementType;
  isActive?: boolean;
  borderColor?: string;
  className?: string;
}

export function NavigationCard({ 
  icon: Icon, 
  isActive = false, 
  borderColor = "border-purple-500",
  className
}: NavigationCardProps) {
  return (
    <Card 
      className={cn(
        "flex items-center justify-center p-8 cursor-pointer transition-all w-[199px] h-[198px] hover:scale-105",
        isActive ? `border-2 ${borderColor}` : "border border-gray-200",
        className
      )}
    >
      {/* Ensure Icon is rendered as a React component */}
      {Icon && <Icon color="black" width="80" height="80" className="h-16 w-16" />}
    </Card>
  );
}