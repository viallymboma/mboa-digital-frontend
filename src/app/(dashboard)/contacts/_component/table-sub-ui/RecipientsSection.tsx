/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';

import {
  Plus,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContactStore } from '@/stores/contacts.store';

import BulkContactSelectionModal from './BulkContactSelectionModal';

const RecipientsSection = () => {
    const { selectedContactsData, addSelectedContact, removeSelectedContact } = useContactStore();
    const [isSelectionModalOpen, setIsSelectionModalOpen] = React.useState(false);
    const [phoneInput, setPhoneInput] = React.useState('');
    const [inputError, setInputError] = React.useState<string | null>(null);

    const handlePhoneInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && phoneInput.trim()) {
            e.preventDefault();
            const phoneRegex = /^\+?\d{6,15}$/;
            if (!phoneRegex.test(phoneInput.trim())) {
                setInputError('Invalid phone number. Use 10-15 digits, optionally starting with +.');
                return;
            }
            setInputError(null);
            // Create a temporary contact object for the manual phone number
            const tempContact: any = {
                id: `manual-${phoneInput.trim()}-${Date.now()}`, // Unique ID for manual entry
                phoneNumber: phoneInput.trim(),
                firstname: 'Manual',
                lastname: 'Entry',
                email: '',
                country: '',
                city: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                version: 0,
                gender: undefined,
                // user: any,
                enterprise: { id: '', socialRaison: '', numeroCommerce: '', telephoneEnterprise: '', emailEnterprise: '', villeEnterprise: '', adresseEnterprise: '', smsESenderId: '', smsCredit: 0, activityDomain: '', pays: { id: '', code: '', enterprises: '' as string, nom: '', continent: '', archived: false, deleted: false, createdAt: '', updatedAt: '', version: 0, imageUrl: "" }, user: [], enterpriseContacts: [], groupes: [], recharges: [], archived: false, deleted: false, createdAt: '', updatedAt: '', version: 0, urlImage: '', urlSiteweb: '', contribuableNumber: "" },
                group: undefined,
                archived: false,
            };
            addSelectedContact(tempContact);
            setPhoneInput('');
        }
        return;
    };

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
                    type='button'
                    onClick={() => setIsSelectionModalOpen(true)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Recipients
                </Button>
            </div>

            {/* Phone Number Input */}
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Enter phone number and press Enter"
                    value={phoneInput}
                    onChange={(e) => {
                        setPhoneInput(e.target.value);
                        setInputError(null);
                    }}
                    onKeyDown={handlePhoneInputKeyDown}
                    className="h-10 border-none outline-none focus:ring-0"
                />
                {inputError && (
                    <p className="text-red-500 text-sm mt-1">{inputError}</p>
                )}
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
                                {contact.firstname === 'Manual' && contact.lastname === 'Entry'
                                    ? contact.phoneNumber
                                    : `${contact.firstname} ${contact.lastname}`}
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

