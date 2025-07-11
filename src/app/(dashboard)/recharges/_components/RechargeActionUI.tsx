"use client";
import React, { useState } from 'react';

import {
  Check,
  Edit,
  MoreVertical,
  X,
} from 'lucide-react';

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
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRecharges } from '@/hooks/useRecharges';
import { RechargeListContentType } from '@/types/recharges';

import EditRechargeForm from './_forms/EditRechargeForm';

type RechargeActionUIProps = {
    rowData: RechargeListContentType;
}

const RechargeActionUI: React.FC<RechargeActionUIProps> = ({ rowData }) => {
    const { validateRecharge, refuseRecharge } = useRecharges();
    const [isRefuseDialogOpen, setIsRefuseDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleValidate = async () => {
        try {
            await validateRecharge(rowData.id);
            setIsPopoverOpen(false);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleRefuse = async () => {
        try {
            await refuseRecharge(rowData.id);
            setIsRefuseDialogOpen(false);
            setIsPopoverOpen(false);
        } catch (error) {
            console.error('Refusal failed:', error);
        }
    };

    return (
        <div className="relative">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="end">
                    {!rowData.archived && (
                        <div className="space-y-2">
                            {/* Edit Option */}
                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button 
                                        variant="ghost" 
                                        className="w-full justify-start"
                                        // onClick={() => setIsPopoverOpen(false)}
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Recharge</DialogTitle>
                                    </DialogHeader>
                                    {/* coming soon... */}
                                    <EditRechargeForm 
                                        recharge={rowData} 
                                        onClose={() => {
                                            setIsEditDialogOpen(false);
                                            setIsPopoverOpen(false);
                                        }}
                                    />
                                </DialogContent>
                            </Dialog>

                            {/* Validate Option */}
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start text-green-600 hover:text-green-700"
                                onClick={handleValidate}
                            >
                                <Check className="mr-2 h-4 w-4" />
                                Validate
                            </Button>

                            {/* Refuse Option */}
                            <AlertDialog open={isRefuseDialogOpen} onOpenChange={setIsRefuseDialogOpen}>
                                <AlertDialogTrigger asChild>
                                    <Button 
                                        variant="ghost" 
                                        className="w-full justify-start text-red-600 hover:text-red-700"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Refuse
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirm Refusal</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to refuse this recharge of {rowData.qteMessage} messages?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleRefuse}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Refuse
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default RechargeActionUI;






















// "use client";
// import React, { useState } from 'react';

// import { EditTableRowSvgIcon } from '@/app/svg_components/SvgIcons';
// // import {
// //   EditRechargeIcon,
// //   RefuseRechargeIcon,
// //   ValidateRechargeIcon,
// // } from '@/app/svg_components/SvgIcons';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { useRecharges } from '@/hooks/useRecharges';
// // import { useRecharges } from '@/hooks/useRecharges';
// import { RechargeListContentType } from '@/types/recharges';

// // import {
// //   RechargeListContentType,
// //   RechargeStatus,
// // } from '@/types/recharges';

// // import EditRechargeForm from '../_forms/EditRechargeForm';

// type RechargeActionUIProps = {
//     rowData: RechargeListContentType;
// }

// const RechargeActionUI: React.FC<RechargeActionUIProps> = ({ rowData }) => {
//     const { validateRecharge, refuseRecharge } = useRecharges();
//     const [isRefuseDialogOpen, setIsRefuseDialogOpen] = useState(false);

//     const handleValidate = async () => {
//         try {
//             await validateRecharge(rowData.id);
//         } catch (error) {
//             console.error('Validation failed:', error);
//         }
//     };

//     const handleRefuse = async () => {
//         try {
//             await refuseRecharge(rowData.id);
//             setIsRefuseDialogOpen(false);
//         } catch (error) {
//             console.error('Refusal failed:', error);
//         }
//     };

//     return (
//         <div className='flex gap-4 justify-between'>
//             {rowData.archived === false && (
//                 <>
//                     {/* Edit Dialog */}
//                     <Dialog>
//                         <DialogTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                                 <EditTableRowSvgIcon />
//                             </Button>
//                         </DialogTrigger>
//                         <DialogContent className="sm:max-w-[425px]">
//                             <DialogHeader>
//                                 <DialogTitle className='text-[28px]'>Edit Recharge</DialogTitle>
//                             </DialogHeader>
//                             coming soon...
//                             {/* <EditRechargeForm 
//                                 recharge={rowData} 
//                                 onClose={() => (document.querySelector("button[aria-label='Close']") as HTMLButtonElement)?.click()}
//                             /> */}
//                         </DialogContent>
//                     </Dialog>

//                     {/* Validate Button */}
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={handleValidate}
//                         className="text-green-600 hover:text-green-700"
//                     >
//                         <EditTableRowSvgIcon />
//                     </Button>

//                     {/* Refuse Dialog */}
//                     <AlertDialog open={isRefuseDialogOpen} onOpenChange={setIsRefuseDialogOpen}>
//                         <AlertDialogTrigger asChild>
//                             <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="text-red-600 hover:text-red-700"
//                             >
//                                 <EditTableRowSvgIcon />
//                             </Button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent>
//                             <AlertDialogHeader>
//                                 <AlertDialogTitle>Confirm Refusal</AlertDialogTitle>
//                                 <AlertDialogDescription>
//                                     Are you sure you want to refuse this recharge of {rowData.qteMessage} messages?
//                                 </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                 <AlertDialogAction
//                                     onClick={handleRefuse}
//                                     className="bg-red-600 hover:bg-red-700"
//                                 >
//                                     Refuse
//                                 </AlertDialogAction>
//                             </AlertDialogFooter>
//                         </AlertDialogContent>
//                     </AlertDialog>
//                 </>
//             )}
//         </div>
//     );
// };

// export default RechargeActionUI;