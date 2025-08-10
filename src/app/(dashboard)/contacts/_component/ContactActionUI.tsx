/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';

import {
  MoreHorizontal,
  SendHorizonalIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  DeleteTableRowSvgIcon,
  EditTableRowSvgIcon,
} from '@/app/svg_components/SvgIcons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useContacts } from '@/hooks/useContacts';
import { useContactStore } from '@/stores/contacts.store';
import { UpdateContactRequestType } from '@/types/contact';

import EditContactForm from './EditContactForm';
import MessageComponent from './MessageComponent';

type ContactActionUIType = {
  rowData: UpdateContactRequestType;
};

const ContactActionUI: React.FC<ContactActionUIType> = ({ rowData }) => {
  const { t } = useTranslation();
  const { deleteContact } = useContacts();
  const { setSelectedContactsData, clearSelectedContacts } = useContactStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  // Map UpdateContactRequestType to EnterpriseContactResponseType
  const contact: any  = {
    ...rowData,
    enterprise: rowData.enterpriseId || { id: '', socialRaison: '' }, // Adjust based on actual data
    user: rowData.user || { id: '', firstname: '', lastname: '' }, // Adjust based on actual data
    smsSenderId: rowData.smsSenderId || '',
    activityDomain: rowData.activityDomain || '',
    villeEntreprise: rowData.villeEntreprise || '',
    pays: rowData.pays || '',
    // contribuableNumber: rowData.contribuableNumber || '',
    archived: rowData || false,
  };

  const handleDelete = async () => {
    try {
      await deleteContact(rowData.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleOpenMessageDialog = () => {
    setSelectedContactsData([contact]);
    setIsMessageDialogOpen(true);
  };

  const handleCloseMessageDialog = () => {
    setIsMessageDialogOpen(false);
    clearSelectedContacts();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <button
              className="flex items-center w-full text-left"
              onClick={() => document.getElementById(`edit-contact-${rowData.id}`)?.click()}
            >
              <EditTableRowSvgIcon />
              {t('contact.editContact', { defaultValue: 'Edit Contact' })}
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className='' onClick={handleOpenMessageDialog}>
            <span className="flex flex-row gap-4 items-center w-full">
              <SendHorizonalIcon />
              {t('contact.sendMessage', { defaultValue: 'Send Message' })}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              className="flex items-center w-full text-left text-red-600"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <DeleteTableRowSvgIcon />
              {t('contact.deleteContact', { defaultValue: 'Delete Contact' })}
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <button id={`edit-contact-${rowData.id}`} className="hidden">
            Edit Contact
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-[28px]">{t('contact.editContactTitle', { defaultValue: 'Edit Profile' })}</DialogTitle>
          </DialogHeader>
          <EditContactForm
            contact={rowData}
            onClose={() => (document.querySelector("button[aria-label='Close']") as HTMLButtonElement)?.click()}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('contact.deleteConfirmTitle', { defaultValue: 'Are you sure?' })}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('contact.deleteConfirmDescription', { defaultValue: 'This action cannot be undone. This will permanently delete the contact {name}.', name: `${rowData.firstname} ${rowData.lastname}` })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('contact.cancel', { defaultValue: 'Cancel' })}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {t('contact.delete', { defaultValue: 'Delete' })}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={handleCloseMessageDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('contact.sendMessageTitle', { defaultValue: 'Send Message to {name}', name: `${rowData.firstname} ${rowData.lastname}` })}</DialogTitle>
          </DialogHeader>
          <MessageComponent />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactActionUI;
