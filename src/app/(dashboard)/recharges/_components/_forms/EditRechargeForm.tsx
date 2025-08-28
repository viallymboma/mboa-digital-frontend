"use client";
import React from 'react';

import { Loader2 } from 'lucide-react';
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
import { notify } from '@/components/utilities/helper';
import { usePricingPlan } from '@/hooks/usePricingPlan';
import { useRecharges } from '@/hooks/useRecharges';
import { useContactStore } from '@/stores/contacts.store';
import { RechargeListContentType } from '@/types/recharges';
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

interface EditRechargeFormProps {
    recharge: RechargeListContentType;
    onClose?: () => void;
}

const EditRechargeForm = ({ recharge, onClose }: EditRechargeFormProps) => {
    const { updateRecharge, isLoading } = useRecharges();
    const { isLoading: isLoadingPlans, calculatePrice, getApplicablePlan } = usePricingPlan();
    const { toggleModal } = useContactStore();

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
        formState: { errors }, 
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            debitPhoneNumber: recharge.debitPhoneNumber,
            qteMessage: recharge.qteMessage,
            paymentMethod: recharge.paymentMethod,
            couponCode: recharge.couponCode || '',
        }
    });

    const qteMessage = watch('qteMessage');

    const totalPrice = React.useMemo(() => {
        const qty = Number(qteMessage) || 0;
        const { price, plan } = calculatePrice(qty);
        
        if (!plan) {
            return 0;
        }
        
        return price;
    }, [qteMessage, calculatePrice]);

    const handleQuantityChange = (value: string) => {
        const qty = Number(value);
        const plan = getApplicablePlan(qty);
        
        if (!plan) {
            setError('qteMessage', {
                type: 'manual',
                message: 'La quantité doit être dans une fourchette de plan disponible'
            });
            return;
        }
        
        clearErrors('qteMessage');
    };

    const onSubmit = async (data: FormData) => {
        try {
            const plan = getApplicablePlan(Number(data.qteMessage));
            if (!plan) {
                setError('qteMessage', {
                    type: 'manual',
                    message: 'La quantité doit être dans une fourchette de plan disponible'
                });
                return;
            }

            await updateRecharge(recharge.id, {
                qteMessage: Number(data.qteMessage),
                debitPhoneNumber: data.debitPhoneNumber,
                paymentMethod: data.paymentMethod,
                couponCode: data.couponCode || undefined,
                debitBankAccountNumber: ''
            });
            notify.success('Recharge mise à jour avec succès');
            reset();
            toggleModal(false);
            toggleModal(undefined as unknown as boolean); // Close the modal
            onClose?.();
        } catch (error: unknown) {
            console.error('Failed to update recharge:', error);
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                typeof (error as { response?: unknown }).response === 'object' &&
                (error as { response?: unknown }).response !== null &&
                (error as { response?: unknown }).response !== undefined &&
                'data' in (error as { response: { data?: unknown } }).response &&
                typeof ((error as { response: { data?: unknown } }).response as { data?: unknown }).data === 'object' &&
                ((error as { response: { data?: unknown } }).response as { data?: unknown }).data !== null &&
                ((error as { response: { data?: unknown } }).response as { data?: { message?: string } }).data !== undefined &&
                ((error as { response: { data?: { message?: string } } }).response as { data?: { message?: string } }).data 
                // &&
                // 'message' in ((error as { response: { data?: { message?: string } } }).response as { data?: { message?: string } }).data
            ) {
                notify.error(
                    (((error as { response: { data?: { message?: string } } }).response as { data?: { message?: string } }).data as { message?: string }).message ||
                    'Échec de la mise à jour'
                );
            } else {
                notify.error('Échec de la mise à jour');
            }
        }
    };

    if (isLoadingPlans) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-h-[500px] overflow-y-auto p-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="text-3xl font-bold text-purple-700 text-center">
                    {totalPrice.toLocaleString()} FCFA
                </div>
                <p className="text-gray-500 text-center mb-4">Prix total</p>

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
                    type="submit"
                    className="w-full bg-purple-700 text-white"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Mise à jour...
                        </span>
                    ) : (
                        'Mettre à jour'
                    )}
                </Button>
            </form>
        </div>
    );
};

export default EditRechargeForm;