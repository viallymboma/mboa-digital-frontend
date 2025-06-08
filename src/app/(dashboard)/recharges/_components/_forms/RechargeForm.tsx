"use client";
import React from 'react';

import {
  ArrowRight,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import {
  Controller,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import {
  CountrySelect,
  FormInput,
} from '@/app/_components/form/FormInput';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { notify } from '@/components/utilities/helper';
import {
  PlanInfoType,
  usePricingPlan,
} from '@/hooks/usePricingPlan';
import { useRecharges } from '@/hooks/useRecharges';
// import { useRecharges } from '@/hooks/useRecharges';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    debitPhoneNumber: z.string().min(9, { message: "Numéro de téléphone invalide" }),
    qteMessage: z.string().transform(Number).pipe(
        z.number().min(1, { message: "Le nombre de SMS doit être supérieur à 0" })
    ),
    paymentMethod: z.string().min(2, { message: "Sélectionnez une méthode de paiement" }),
    couponCode: z.string().optional()
});

type FormData = z.infer<typeof schema>;

const RechargeForm = ({ onClose }: { onClose?: () => void }) => {
    const [step, setStep] = React.useState(1);
    const { createRecharge, isLoading } = useRecharges();
    const { isLoading: isLoadingPlans, calculatePrice, getApplicablePlan } = usePricingPlan();

    const paymentOptions = [
        { value: 'CASH', label: 'Cash' },
        { value: 'MOMO', label: 'MTN Mobile Money' },
        { value: 'OM', label: 'Orange Money' },
        { value: 'BANK', label: 'Bank account' },
    ];

    const {
        handleSubmit,
        control,
        watch,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            debitPhoneNumber: '',
            qteMessage: 0,
            paymentMethod: '',
            couponCode: '',
        }
    });

    // // Fetch active plans on mount
    // React.useEffect(() => {
    //     const fetchPlans = async () => {
    //         try {
    //             await activePlans();
    //         } catch (error) {
    //             console.error('Failed to fetch plans:', error);
    //             notify.error('Failed to fetch pricing plans');
    //         }
    //     };
    //     fetchPlans();
    // }, []);

    // Watch qteMessage to calculate total price
    const qteMessage = watch('qteMessage');

    const totalPrice = React.useMemo(() => {
        const qty = Number(qteMessage) || 0;
        const { price, plan } = calculatePrice(qty);
        
        if (!plan) {
            return 0;
        }
        
        return price;
    }, [qteMessage, calculatePrice]);

    // const handleQuantityChange = (value: string) => {
    //     const qty = Number(value);
    //     const plan = getApplicablePlan(qty);
        
    //     if (!plan) {
    //         setError('qteMessage', {
    //             type: 'manual',
    //             message: 'La quantité doit être dans une fourchette de plan disponible'
    //         });
    //         return;
    //     }
        
    //     clearErrors('qteMessage');
    // };

    const [selectedPlanInfo, setSelectedPlanInfo] = React.useState<PlanInfoType>();

    const handleQuantityChange = (value: string) => {
        const qty = Number(value);
        const { planInfo } = getApplicablePlan(qty);
        
        if (!planInfo) {
            setError('qteMessage', {
                type: 'manual',
                message: 'La quantité doit être dans une fourchette de plan disponible'
            });
            setSelectedPlanInfo(undefined);
            return;
        }
        
        setSelectedPlanInfo(planInfo);
        clearErrors('qteMessage');
    };

    const onSubmit = async (data: FormData) => {
        try {
            // Validate quantity against plans
            const plan = getApplicablePlan(Number(data.qteMessage));
            if (!plan) {
                setError('qteMessage', {
                    type: 'manual',
                    message: 'La quantité doit être dans une fourchette de plan disponible'
                });
                return;
            }

            if (step === 1) {
                setStep(2);
                return;
            }

            await createRecharge({
                qteMessage: Number(data.qteMessage),
                debitPhoneNumber: data.debitPhoneNumber,
                paymentMethod: data.paymentMethod,
                couponCode: data.couponCode || undefined,
                debitBankAccountNumber: ''
            });
            notify.success('Recharge initiée avec succès');
            onClose?.();
        } catch (error: unknown) {
            console.error('Failed to create recharge:', error);
            let message = 'Failed to fetch recharges';
            if (
                error &&
                typeof error === 'object' &&
                'response' in error &&
                (error as { response?: unknown }).response &&
                typeof (error as { response?: unknown }).response === 'object' &&
                'data' in (error as { response: { data?: unknown } }).response &&
                (error as { response: { data?: unknown } }).response.data &&
                typeof (error as { response: { data?: unknown } }).response.data === 'object' &&
                'message' in (error as { response: { data: { message?: string } } }).response.data
            ) {
                // @ts-expect-error: dynamic error shape
                message = error.response.data.message || message;
            }
            notify.error(message);
            setStep(1);
        }
    };

    // Show loading state while fetching plans
    if (isLoadingPlans) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-h-[500px] overflow-y-auto p-2">
            <h2 className="text-xl font-bold mb-4">Faire une recharge</h2>

            <div className="flex flex-row gap-3 items-center">
                <Progress value={step === 1 ? 100 : 0} className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5" />
                <Progress value={step === 1 ? 0 : 100} className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="text-3xl font-bold text-purple-700 text-center">
                    {totalPrice.toLocaleString()} FCFA
                </div>
                <p className="text-gray-500 text-center mb-4">Prix total</p>

                {selectedPlanInfo && (
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <h3 className="font-semibold text-lg text-purple-700">
                            Plan {selectedPlanInfo.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {selectedPlanInfo.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium">Quantité min:</span>{' '}
                                {selectedPlanInfo.minSMS.toLocaleString()} SMS
                            </div>
                            <div>
                                <span className="font-medium">Quantité max:</span>{' '}
                                {selectedPlanInfo.maxSMS.toLocaleString()} SMS
                            </div>
                            <div>
                                <span className="font-medium">Prix unitaire:</span>{' '}
                                {selectedPlanInfo.unitPrice} FCFA
                            </div>
                            <div>
                                <span className="font-medium">Validité:</span>{' '}
                                {selectedPlanInfo.validity} jours
                            </div>
                        </div>
                    </div>
                )}

                {step === 1 ? (
                    <>
                        <Controller
                            name="debitPhoneNumber"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    className="border-primaryAppearance"
                                    type="tel"
                                    placeholder="Ex: 237612345678"
                                    error={errors.debitPhoneNumber?.message}
                                />
                            )}
                        />

                        <Controller
                            name="qteMessage"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    className="border-primaryAppearance"
                                    type="number"
                                    min="1"
                                    placeholder="Entrez le nombre de SMS"
                                    error={errors.qteMessage?.message}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleQuantityChange(e.target.value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="paymentMethod"
                            control={control}
                            render={({ field }) => (
                                <CountrySelect
                                    {...field}
                                    placeHolder='Selectionnez une methode'
                                    placeHolderSearch='Rechercher une methode'
                                    className="border-primaryAppearance"
                                    options={paymentOptions}
                                    error={errors.paymentMethod?.message}
                                />
                            )}
                        />

                        <Button 
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            className="w-full bg-purple-700 text-white"
                            disabled={isLoading}
                        >
                            Suivant <ArrowRight className="ml-2" />
                        </Button>
                    </>
                ) : (
                    <>
                        <p className="text-center text-black font-medium mb-4">
                            Valider la transaction sur votre mobile et cliquer sur terminer la
                            transaction
                        </p>

                        <Button 
                            type="button"
                            className="w-full bg-purple-700 text-white"
                            disabled={isLoading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Traitement...
                                </span>
                            ) : (
                                <>
                                    Terminer la Transaction <CheckCircle className="ml-2" />
                                </>
                            )}
                        </Button>

                        <Button 
                            type="button"
                            variant="outline" 
                            className="w-full mt-3" 
                            onClick={() => setStep(1)}
                            disabled={isLoading}
                        >
                            Retour
                        </Button>
                    </>
                )}
            </form>
        </div>
    );
};

export default RechargeForm;
































// "use client";
// import React from 'react';

// import {
//   ArrowRight,
//   CheckCircle,
//   Loader2,
// } from 'lucide-react';
// import {
//   Controller,
//   useForm,
// } from 'react-hook-form';
// import { z } from 'zod';

// import {
//   CountrySelect,
//   FormInput,
// } from '@/app/_components/form/FormInput';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import { notify } from '@/components/utilities/helper';
// import { usePricingPlan } from '@/hooks/usePricingPlan';
// import { useRecharges } from '@/hooks/useRecharges';
// import { PricingPlanType } from '@/types/pricing';
// import { zodResolver } from '@hookform/resolvers/zod';

// const schema = z.object({
//     debitPhoneNumber: z.string().min(9, { message: "Numéro de téléphone invalide" }),
//     qteMessage: z.string().transform(Number).pipe(
//         z.number().min(1, { message: "Le nombre de SMS doit être supérieur à 0" })
//     ),
//     paymentMethod: z.string().min(2, { message: "Sélectionnez une méthode de paiement" }),
//     couponCode: z.string().optional()
// });

// type FormData = z.infer<typeof schema>;



// const RechargeForm = ({ onClose }: { onClose?: () => void }) => {
//     const [step, setStep] = React.useState(1);
//     const { createRecharge, isLoading } = useRecharges();

//     const paymentOptions = [
//         { value: 'CASH', label: 'Cash' },
//         { value: 'MOMO', label: 'MTN Mobile Money' },
//         { value: 'OM', label: 'Orange Money' },
//         { value: 'BANK', label: 'Bank account' },
//     ];

//     const {
//         handleSubmit,
//         control,
//         watch,
//         formState: { errors }
//     } = useForm<FormData>({
//         resolver: zodResolver(schema),
//         defaultValues: {
//             debitPhoneNumber: '',
//             qteMessage: 0,
//             paymentMethod: undefined,
//             couponCode: '',
//         }
//     });

//     // Watch qteMessage to calculate total price
//     const qteMessage = watch('qteMessage');
//     // const { activePlans, fetchActivePlans } = usePricingPlan();
//     const { activePlans, isLoading: isLoadingPlans, calculatePrice } = usePricingPlan();

//     const totalPrice = React.useMemo(() => {
//         const qty = Number(qteMessage) || 0;
//         const { price, plan } = calculatePrice(qty);
        
//         if (!plan) {
//             // Show error or warning about invalid quantity
//             return 0;
//         }
        
//         return price;
//     }, [qteMessage, calculatePrice]);

//     const handleQuantityChange = (value: string) => {
//         const qty = Number(value);
//         const plan = getApplicablePlan(qty);
        
//         if (!plan) {
//             // Show error about invalid quantity range
//             // setError('qteMessage', {
//             //     type: 'manual',
//             //     message: 'Quantity must be within an available plan range'
//             // });
//             notify.success('Group created successfully');
//             return;
//         }
//         notify.success('Group created successfully');
        
//         // clearErrors('qteMessage');
//     };
//     // const totalPrice = React.useMemo(() => {
//     //     const qty = Number(qteMessage) || 0;
//     //     return qty * 25; // Assuming 25 FCFA per SMS
//     // }, [qteMessage]);

//     const onSubmit = async (data: FormData) => {
//         if (step === 1) {
//             setStep(2);
//             return;
//         }

//         try {
//             await createRecharge({
//                 qteMessage: Number(data.qteMessage),
//                 debitPhoneNumber: data.debitPhoneNumber,
//                 paymentMethod: data.paymentMethod,
//                 couponCode: data.couponCode || undefined, 
//                 debitBankAccountNumber: ''
//             });
//             notify.success('Recharge initiée avec succès');
//             onClose?.();
//         } catch (error) {
//             console.error('Failed to create recharge:', error);
//             setStep(1);
//         }
//     };

//     return (
//         <div className="max-h-[500px] overflow-y-auto p-2">
//             <h2 className="text-xl font-bold mb-4">Faire une recharge</h2>

//             {/* <div className="flex flex-row gap-3 items-center mb-6">
//                 <Progress 
//                     value={progress} 
//                     className="bg-gray-200 [&>div]:bg-primaryAppearance" 
//                 />
//             </div> */}

//             <div className={`flex flex-row gap-3 items-center`}>
//                 <Progress value={ step === 1 ? 100 : 0 } className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5 " />
//                 <Progress value={ step === 1 ? 0 : 100 } className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5 " />
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 <div className="text-3xl font-bold text-purple-700 text-center">
//                     {totalPrice.toLocaleString()} FCFA
//                 </div>
//                 <p className="text-gray-500 text-center mb-4">Prix total</p>

//                 {step === 1 ? (
//                     <>
//                         <Controller
//                             name="debitPhoneNumber"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     className="border-primaryAppearance"
//                                     // label="Numéro de téléphone"
//                                     type="tel"
//                                     placeholder="Ex: 237612345678"
//                                     error={errors.debitPhoneNumber?.message}
//                                 />
//                             )}
//                         />

//                         <Controller
//                             name="qteMessage"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     className="border-primaryAppearance"
//                                     // label="Nombre de SMS"
//                                     type="number"
//                                     min="1"
//                                     placeholder="Entrez le nombre de SMS"
//                                     error={errors.qteMessage?.message}
//                                 />
//                             )}
//                         />

//                         {/* <Controller
//                             name="paymentMethod"
//                             control={control}
//                             render={({ field }) => (
//                                 <CountrySelect
//                                     {...field}
//                                     // label="Méthode de paiement"
//                                     placeHolder='Selectionnez une methode'
//                                     placeHolderSearch='Rechercher une methode'
//                                     className="border-primaryAppearance"
//                                     options={paymentOptions}
//                                     error={errors.paymentMethod?.message}
//                                 />
//                             )}
//                         /> */}
//                         <Controller
//                             name="paymentMethod"
//                             control={control}
//                             defaultValue=""
//                             render={({ field }) => (
//                             <CountrySelect
//                                 {...field}
//                                 // label="Méthode de paiement"
//                                 placeHolder='Selectionnez une methode'
//                                 placeHolderSearch='Rechercher une methode'
//                                 className='border-primaryAppearance'
//                                 options={paymentOptions}
//                                 value={field.value}
//                                 // onChange={field.onChange}
//                                 error={errors.paymentMethod?.message} // Include error for country
//                             />
//                             )}
//                         />

//                         <Button 
//                             type="submit" 
//                             className="w-full bg-purple-700 text-white"
//                             disabled={isLoading}
//                         >
//                             Suivant <ArrowRight className="ml-2" />
//                         </Button>
//                     </>
//                 ) : (
//                     <>
//                         <p className="text-center text-black font-medium mb-4">
//                             Valider la transaction sur votre mobile et cliquer sur terminer la
//                             transaction
//                         </p>

//                         <Button 
//                             type="submit" 
//                             className="w-full bg-purple-700 text-white"
//                             disabled={isLoading}
//                             onClick={handleSubmit(onSubmit)}
//                             // onClick={(e) => {
//                             //     e.preventDefault();
//                             // }}
//                         >
//                             {isLoading ? (
//                                 <span className="flex items-center">
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     Traitement...
//                                 </span>
//                             ) : (
//                                 <>
//                                     Terminer la Transaction <CheckCircle className="ml-2" />
//                                 </>
//                             )}
//                         </Button>

//                         <Button 
//                             type="button"
//                             variant="outline" 
//                             className="w-full mt-3" 
//                             onClick={() => {
//                                 setStep(1);
//                                 // setProgress(50);
//                             }}
//                             disabled={isLoading}
//                         >
//                             Retour
//                         </Button>
//                     </>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default RechargeForm;





















// "use client";
// import React, { useState } from 'react';

// import {
//   ArrowRight,
//   CheckCircle,
// } from 'lucide-react';
// import {
//   Controller,
//   useForm,
// } from 'react-hook-form';
// import { z } from 'zod';

// import {
//   CountrySelect,
//   FormInput,
// } from '@/app/_components/form/FormInput';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRecharges } from '@/hooks/useRecharges';

// // ✅ Define validation schema using Zod
// const schema = z.object({
//   phone: z.string().min(9, { message: "Numéro de téléphone invalide" }),
//   smsCount: z.string().min(1, { message: "Nombre de SMS requis" }),
//   rechargeType: z.string().min(1, { message: "Type de recharge requis" }),
// });

// // ✅ Define form data type
// type FormData = z.infer<typeof schema>;

// const RechargeForm = ({ onClose }: { onClose?: () => void }) => {
//   const [step, setStep] = useState(1);
//   const [totalPrice] = useState(1500);
//   const { createRecharge, isLoading } = useRecharges();

//   const options = [
//     { value: 'hf3894fu8034jfhihfif-2948492', label: 'MTN Momo' },
//     { value: 'dbwg62t4r892483714y0r9284903', label: 'Orange Money' },
//     { value: 'cnwiurfh98wufu24o98240924yh2', label: 'Vodafone Cash' },
//   ];

//   // ✅ Initialize react-hook-form with Zod validation
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   // ✅ Form Submission
//   const onSubmit = async (data: FormData) => {
//     console.log("Recharge Details:", data);
//     setStep(2); // Move to step 2 on success

//     try {
//         await createRecharge({
//             qteMessage: data.qteMessage,
//             debitPhoneNumber: data.debitPhoneNumber,
//             paymentMethod: data.paymentMethod,
//             couponCode: data.couponCode,
//         });
//         onClose?.();
//     } catch (error) {
//         console.error('Failed to create recharge:', error);
//     }
//   };

  

//   const performRechargeAction = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     console.log("Recharge completed successfully");
//   }

//   return (
//     <div className="max-h-[500px] overflow-y-auto p-2">
//       {/* Title */}
//       <h2 className="text-xl font-bold">Faire une recharge</h2>

//       {/* Progress Indicator */}
//       {/* <Progress value={step === 1 ? 50 : 100} className="mt-3 mb-5 " /> */}
//       <div className={`flex flex-row gap-3 items-center`}>
//         <Progress value={ step === 1 ? 100 : 0 } className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5 " />
//         <Progress value={ step === 1 ? 0 : 100 } className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5 " />
//       </div>

//       {step === 1 && (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="text-3xl font-bold text-purple-700 text-center">
//             {totalPrice} FCFA
//           </div>
//           <p className="text-gray-500 text-center mb-4">Prix total</p>

//           {/* Phone Input */}
//           <Controller
//             name="phone"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <FormInput 
//                   {...field}
//                   className='border-primaryAppearance'
//                   // label={t('contact.contactForm.fullName')}
//                   label=""
//                   type="number"
//                   placeholder={"Numéro de Téléphone"}
//                   error={errors.phone?.message}
//               />
//             )}
//           />
//           {/* {errors.phone && (
//             <p className="text-red-500 text-sm">{errors.phone.message}</p>
//           )} */}

//           {/* SMS Count Input */}
//           <Controller
//             name="smsCount"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <FormInput 
//                   {...field}
//                   className='border-primaryAppearance'
//                   // label={t('contact.contactForm.fullName')}
//                   label=""
//                   type="number"
//                   placeholder={"Nombres de SMS"}
//                   error={errors.smsCount?.message}
//               />
//             )}
//           />
//           {/* {errors.smsCount && (
//             <p className="text-red-500 text-sm">{errors.smsCount.message}</p>
//           )} */}

//           {/* Recharge Type Select */}
//           <Controller
//             name="rechargeType"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <CountrySelect
//                 {...field}
//                 label=""
//                 className='border-primaryAppearance'
//                 options={options}
//                 value={field.value}
//                 // onChange={field.onChange}
//                 error={errors.rechargeType?.message} // Include error for country
//               />
//             )}
//           />
//           {/* {errors.rechargeType && (
//             <p className="text-red-500 text-sm">{errors.rechargeType.message}</p>
//           )} */}

//           {/* Next Button */}
//           <Button type="submit" className="w-full bg-purple-700 text-white">
//             Suivant <ArrowRight className="ml-2" />
//           </Button>
//         </form>
//       )}

//       {step === 2 && (
//         <>
//           <div className="text-3xl font-bold text-purple-700 text-center mb-2">
//             {totalPrice} FCFA
//           </div>
//           <p className="text-gray-500 text-center mb-4">Prix total</p>
//           <p className="text-center text-black font-medium mb-4">
//             Valider la transaction sur votre mobile et cliquer sur terminer la
//             transaction
//           </p>

//           {/* Complete Button */}
//           <Button onClick={(e) => performRechargeAction (e)} className="w-full bg-purple-700 text-white">
//             Terminer la Transaction <CheckCircle className="ml-2" />
//           </Button>

//           {/* Back Button */}
//           <Button variant="outline" className="w-full mt-3" onClick={() => setStep(1)}>
//             Retour
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };

// export default RechargeForm;















// import React, { useState } from 'react';

// import {
//   ArrowRight,
//   CheckCircle,
// } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Progress } from '@/components/ui/progress';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from '@/components/ui/select';

// const RechargeForm = () => {
//   const [step, setStep] = useState(1);
//   const [phone, setPhone] = useState('');
//   const [smsCount, setSmsCount] = useState('');
//   const [rechargeType, setRechargeType] = useState('');

//   console.log(rechargeType)
//   const [totalPrice] = useState(1500);

//   const handleNext = () => {
//     if (step < 2) setStep(step + 1);
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
//       {/* Title */}
//       <h2 className="text-xl font-bold">Faire une recharge</h2>

//       {/* Progress Bar */}
//       <Progress value={step === 1 ? 50 : 100} className="mt-3 mb-5" />

//       {/* Step 1: Recharge Details */}
//       {step === 1 && (
//         <>
//           <div className="text-3xl font-bold text-purple-700 text-center mb-2">
//             {totalPrice} FCFA
//           </div>
//           <p className="text-gray-500 text-center mb-4">Prix total</p>

//           {/* Form Fields */}
//           <Input
//             type="tel"
//             placeholder="Numéro de Téléphone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="mb-3"
//           />
//           <Input
//             type="number"
//             placeholder="Nombres de SMS"
//             value={smsCount}
//             onChange={(e) => setSmsCount(e.target.value)}
//             className="mb-3"
//           />
//           <Select onValueChange={setRechargeType}>
//             <SelectTrigger className="mb-4">Type de recharge</SelectTrigger>
//             <SelectContent>
//               <SelectItem value="mobile">Mobile</SelectItem>
//               <SelectItem value="internet">Internet</SelectItem>
//               <SelectItem value="data">Data</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Next Button */}
//           <Button className="w-full bg-purple-700 text-white" onClick={handleNext}>
//             Suivant <ArrowRight className="ml-2" />
//           </Button>
//         </>
//       )}

//       {/* Step 2: Confirmation */}
//       {step === 2 && (
//         <>
//           <div className="text-3xl font-bold text-purple-700 text-center mb-2">
//             {totalPrice} FCFA
//           </div>
//           <p className="text-gray-500 text-center mb-4">Prix total</p>
//           <p className="text-center text-black font-medium mb-4">
//             Valider la transaction sur votre mobile et cliquer sur terminer la transaction
//           </p>

//           {/* Complete Button */}
//           <Button className="w-full bg-purple-700 text-white">
//             Terminer la Transaction <CheckCircle className="ml-2" />
//           </Button>

//           {/* Back Button */}
//           <Button variant="outline" className="w-full mt-3" onClick={handleBack}>
//             Retour
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };

// export default RechargeForm;
