import React, { useMemo } from 'react';

import {
  Search,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useContacts } from '@/hooks/useContacts';
import { useContactStore } from '@/stores/contacts.store';
import { EnterpriseContactResponseType } from '@/types/contact';

interface BulkContactSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BulkContactSelectionModal: React.FC<BulkContactSelectionModalProps> = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [ uneven, setUneven ] = React.useState<boolean> (false)
    const { contacts, addSelectedContact, removeSelectedContact, toggleMultipleContacts, unToggleMultipleContacts, selectedContactsData } = useContactStore();
    const { contacts: allContacts } = useContacts();

    // Filter contacts based on search query
    const filteredContacts = useMemo(() => {
        return contacts && contacts.length > 0 ? contacts?.filter(contact => 
            contact.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.phoneNumber.includes(searchQuery)
        ) : allContacts?.filter(contact =>
            contact.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.phoneNumber.includes(searchQuery)
        );
    }, [contacts, searchQuery]);

    const isContactSelected = (contact: EnterpriseContactResponseType) => selectedContactsData.some(selected => selected.id === contact.id);

    const handleContactToggle = (contact: EnterpriseContactResponseType) => {
        if (isContactSelected(contact)) removeSelectedContact(contact.id);
        else addSelectedContact(contact);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Select Contacts</DialogTitle>
                </DialogHeader>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12"
                    />
                </div>

                {/* Selected Contacts List */}
                {selectedContactsData.length > 0 && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Selected Contacts ({selectedContactsData.length})</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedContactsData.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm border"
                                >
                                    <span>{contact.firstname} {contact.lastname}</span>
                                    <button
                                        onClick={() => removeSelectedContact(contact.id)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contacts List */}
                <ScrollArea className="flex-1 px-1">
                    <div className="space-y-2">
                        {filteredContacts?.map((contact) => (
                            <div
                                key={contact.id}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                            >
                                <div>
                                    <h3 className="font-medium">{`${contact.firstname} ${contact.lastname}`}</h3>
                                    <p className="text-sm text-gray-500">{contact.phoneNumber}</p>
                                </div>
                                <Button
                                    variant={isContactSelected(contact) ? "destructive" : "secondary"}
                                    size="sm"
                                    onClick={() => handleContactToggle(contact)}
                                >
                                    {isContactSelected(contact) ? 'Remove' : 'Select'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setUneven (uneven => !uneven)
                            if (uneven) {
                                unToggleMultipleContacts ()
                            } else {
                                toggleMultipleContacts (contacts)
                            }
                        }}
                    >
                        {
                            uneven ? "Deselect All Filtered" : "Select All Filtered"
                        }
                    </Button>
                    <div className="space-x-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={onClose}>
                            Validate Selection
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BulkContactSelectionModal;