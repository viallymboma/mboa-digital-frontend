"use client";

import { useState } from 'react';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

interface DidYouKnowProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export function DidYouKnow({
  title = "Le Saviez Vous ?",
  description = "Gagnez de l'argent en emmenant d'autre personne à utiliser la plateforme",
  buttonText = "En Savoir plus",
}: DidYouKnowProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="bg-[#2A2A2A] text-white border-none overflow-hidden relative w-[369px] h-[420px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-8">
        <div className="space-y-4">
          <h2 className="text-[32px] font-bold">{title}</h2>
          <p className="text-[16px]">{description}</p>

          <Button 
            className={`bg-purple-600 hover:bg-purple-700 text-white mt-4 px-6 h-auto text-lg transition-all ${isHovered ? 'translate-x-2' : ''}`}
          >
            {buttonText} <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Decorative circles with avatars */}
        <div className="absolute bottom-0 right-0 left-0 flex justify-between">
          <div className="flex -space-x-4 overflow-hidden">
            {/* Avatar circles with colored borders */}
            {[
              { color: "border-purple-500", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
              { color: "border-yellow-500", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
              { color: "border-white", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop" },
              { color: "border-red-500", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" },
            ].map((avatar, index) => (
              <div 
                key={index}
                className={`w-16 h-16 rounded-full border-2 ${avatar.color} overflow-hidden bg-gray-800`}
                style={{
                  backgroundImage: `url(${avatar.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            ))}
          </div>
          <div className="flex -space-x-4 overflow-hidden">
            {/* Second row of avatars */}
            {[
              { color: "border-green-500", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=100&auto=format&fit=crop" },
              { color: "border-pink-500", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" },
              { color: "border-blue-500", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop" },
            ].map((avatar, index) => (
              <div 
                key={index}
                className={`w-16 h-16 rounded-full border-2 ${avatar.color} overflow-hidden bg-gray-800`}
                style={{
                  backgroundImage: `url(${avatar.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}