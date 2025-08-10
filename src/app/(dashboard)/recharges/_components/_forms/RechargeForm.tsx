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

  const qteMessage = watch('qteMessage');

  const { price } = React.useMemo(() => {
    const qty = Number(qteMessage) || 0;
    return calculatePrice(qty);
  }, [qteMessage, calculatePrice]);

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
          {price.toLocaleString()} FCFA
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
              <div>
                <span className="font-medium">Quantité Totale:</span>{' '}
                {qteMessage.toLocaleString()} SMS
              </div>
              <div>
                <span className="font-medium">Prix Totale:</span>{' '}
                {price.toLocaleString()} FCFA
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
                  label='Phone number'
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
                  label='Number of sms'
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
                  label='Payment Method'
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
              Cliquez sur Initier la transaction et valider sur votre mobile money
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
