"use client";
import React from 'react';

import {
  Plus,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useContactStore } from '@/stores/contacts.store';

import BulkContactSelectionModal from './BulkContactSelectionModal';

const RecipientsSection = () => {
    const { selectedContactsData, removeSelectedContact } = useContactStore();
    const [isSelectionModalOpen, setIsSelectionModalOpen] = React.useState(false);
    return (
        <div className="flex flex-col gap-2 p-4">
            {/* Recipients Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">À:</span>
                    {selectedContactsData.length === 0 && (
                        <span className="text-gray-400 text-sm italic">
                            No recipients selected
                        </span>
                    )}
                </div>
                <Button
                    onClick={() => setIsSelectionModalOpen(true)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Recipients
                </Button>
            </div>

            {/* Selected Recipients Chips */}
            {selectedContactsData.length > 0 && (
                <div className="flex justify-start flex-wrap gap-2">
                    {selectedContactsData.map((contact) => (
                        <div
                            key={contact.id}
                            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 
                                    px-2 py-1 rounded-md text-sm transition-colors"
                        >
                            <span className="text-gray-700">
                                {contact.firstname} {contact.lastname}
                            </span>
                            <button
                                onClick={() => removeSelectedContact(contact.id)}
                                className="text-gray-400 hover:text-red-500 rounded-full 
                                        hover:bg-gray-300/50 p-0.5 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Selection Modal */}
            <BulkContactSelectionModal 
                isOpen={isSelectionModalOpen}
                onClose={() => setIsSelectionModalOpen(false)}
            />
        </div>

    )
}

export default RecipientsSection