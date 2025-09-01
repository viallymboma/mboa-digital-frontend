"use client";
import React from 'react';

import {
  ArrowRight,
  CheckCircle,
  Hash,
  Loader2,
  Phone,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  debitPhoneNumber: z.string().min(9, { message: "recharges.form.debitPhoneNumberInvalid" }),
  qteMessage: z.string().transform(Number).pipe(
    z.number().min(1, { message: "recharges.form.qteMessageMin" })
  ),
  paymentMethod: z.string().min(2, { message: "recharges.form.paymentMethodRequired" }),
  couponCode: z.string().optional()
});

type FormData = z.infer<typeof schema>;

const RechargeForm = ({ onClose }: { onClose?: () => void }) => {
  const t = useTranslations('recharges');
  const [step, setStep] = React.useState(1);
  const { createRecharge, isLoading } = useRecharges();
  const { isLoading: isLoadingPlans, calculatePrice, getApplicablePlan } = usePricingPlan();

  const paymentOptions = [
    { value: 'CASH', label: t('form.paymentOptions.cash') },
    { value: 'MOMO', label: t('form.paymentOptions.momo') },
    { value: 'OM', label: t('form.paymentOptions.om') },
    { value: 'BANK', label: t('form.paymentOptions.bank') },
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
        message: t('form.qteMessageInvalid')
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
          message: t('form.qteMessageInvalid')
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
      notify.success(t('form.success'));
      onClose?.();
    } catch (error: unknown) {
      console.error('Failed to create recharge:', error);
      let message = t('form.error');
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        (error as { response?: unknown }).response &&
        typeof (error as { response?: unknown }).response === 'object' &&
        'data' in (error as { response: { data?: unknown } }).response &&
        (error as { response: { data?: unknown } }).response.data &&
        typeof (error as { response: { data: { message?: string } } }).response.data === 'object' &&
        'message' in (error as { response: { data: { message?: string } } }).response.data
      ) {
        message = (error as { response: { data: { message?: string } } }).response.data.message || message;
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
      <h2 className="text-xl font-bold mb-4">{t('form.title')}</h2>

      <div className="flex flex-row gap-3 items-center">
        <Progress value={step === 1 ? 100 : 0} className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5" />
        <Progress value={step === 1 ? 0 : 100} className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-3xl font-bold text-purple-700 text-center">
          {price.toLocaleString()} FCFA
        </div>
        <p className="text-gray-500 text-center mb-4">{t('form.totalPrice')}</p>

        {selectedPlanInfo && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-lg text-purple-700">
              {t('form.planTitle')} { selectedPlanInfo.name }
            </h3>
            <p className="text-sm text-gray-600">
              {selectedPlanInfo.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">{t('form.minQuantity')}:</span>{' '}
                {selectedPlanInfo.minSMS.toLocaleString()} SMS
              </div>
              <div>
                <span className="font-medium">{t('form.maxQuantity')}:</span>{' '}
                {selectedPlanInfo.maxSMS.toLocaleString()} SMS
              </div>
              <div>
                <span className="font-medium">{t('form.unitPrice')}:</span>{' '}
                {selectedPlanInfo.unitPrice} FCFA
              </div>
              <div>
                <span className="font-medium">{t('form.validity')}:</span>{' '}
                {selectedPlanInfo.validity} {t('days')}
              </div>
              <div>
                <span className="font-medium">{t('form.totalQuantity')}:</span>{' '}
                {qteMessage.toLocaleString()} SMS
              </div>
              <div>
                <span className="font-medium">{t('form.totalPrice')}:</span>{' '}
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
                  label={t('form.debitPhoneNumberLabel')}
                  type="tel"
                  placeholder={t('form.debitPhoneNumberPlaceholder')}
                  error={errors.debitPhoneNumber?.message}
                  icon={<Phone className="h-4 w-4 text-gray-400" />}
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
                  label={t('form.qteMessageLabel')}
                  placeholder={t('form.qteMessagePlaceholder')}
                  error={errors.qteMessage?.message}
                  icon={<Hash className="h-4 w-4 text-gray-400" />}
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
                  label={t('form.paymentMethodLabel')}
                  placeHolder={t('form.paymentMethodPlaceholder')}
                  placeHolderSearch={t('form.paymentMethodSearchPlaceholder')}
                  className="border-primaryAppearance"
                  options={paymentOptions}
                  error={errors.paymentMethod?.message}
                  // icon={<CreditCard />}
                />
              )}
            />

            <Button 
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-purple-700 text-white"
              disabled={isLoading}
            >
              {t('form.next')} <ArrowRight className="ml-2" />
            </Button>
          </>
        ) : (
          <>
            <p className="text-center text-black font-medium mb-4">
              {t('form.initiateTransaction')}
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
                  {t('form.processing')}
                </span>
              ) : (
                <>
                  {t('form.completeTransaction')} <CheckCircle className="ml-2" />
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
              {t('form.back')}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default RechargeForm;
