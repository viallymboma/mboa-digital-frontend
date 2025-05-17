"use client";
import React, { useState } from 'react';

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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useContacts } from '@/hooks/useContacts';
import { UpdateContactRequestType } from '@/types/contact';

import EditContactForm from './EditContactForm';

type ContactActionUIType = {
    rowData: UpdateContactRequestType
}

const ContactActionUI: React.FC<ContactActionUIType> = ({ rowData }) => {
    const { deleteContact } = useContacts();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteContact(rowData.id);
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className='flex gap-4 justify-between'>
            {/* Edit Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="text-gray-600 hover:text-gray-900">
                        <EditTableRowSvgIcon />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-[28px]'>Editer votre profiles</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <EditContactForm 
                        contact={rowData} 
                        onClose={() => (document.querySelector("button[aria-label='Close']") as HTMLButtonElement)?.click()}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                    <button className="text-gray-600 hover:text-gray-900">
                        <DeleteTableRowSvgIcon />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cette action supprimera définitivement le contact
                            <span className="font-semibold"> {rowData.firstname} {rowData.lastname}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ContactActionUI;





















// "use client";
// import React from 'react';

// import {
//   DeleteTableRowSvgIcon,
//   EditTableRowSvgIcon,
// } from '@/app/svg_components/SvgIcons';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { useContacts } from '@/hooks/useContacts';
// import { UpdateContactRequestType } from '@/types/contact';

// import CreateContactForm from './CreateContactForm';

// type ContactActionUIType = {
//     rowData: UpdateContactRequestType
// }
// const ContactActionUI: React.FC <ContactActionUIType> = ({ rowData }) => {
//     const { editContact, deleteContact } = useContacts();
//     return (
//         <div className='flex gap-4 justify-between'>
//             <Dialog>
//                 <DialogTrigger asChild>
//                     <button 
//                         className="text-gray-600 hover:text-gray-900"
//                         onClick={() => editContact(rowData)}>
//                         <EditTableRowSvgIcon />
//                     </button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[425px]">
//                     <DialogHeader>
//                         <DialogTitle className='text-[28px]'>Editer votre profiles</DialogTitle>
//                         <DialogDescription></DialogDescription>
//                     </DialogHeader>
//                     <CreateContactForm />
//                 </DialogContent>
//             </Dialog>
//             <button 
//                 className="text-gray-600 hover:text-gray-900"
//                 onClick={() => deleteContact(rowData.id)}>
//                 <DeleteTableRowSvgIcon />
//             </button>
//         </div>
//     )
// }

// export default ContactActionUI