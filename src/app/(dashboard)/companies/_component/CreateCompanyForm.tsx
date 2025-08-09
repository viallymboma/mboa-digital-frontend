// app/(dashboard)/companies/_component/CreateCompanyForm.tsx
'use client';
import React from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCompanies } from '@/hooks/useCompanies';
import { CreateCompanyRequestType } from '@/types/company';

const CreateCompanyForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { createCompany } = useCompanies();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCompanyRequestType>();

  const onSubmit = async (data: CreateCompanyRequestType) => {
    try {
      await createCompany(data);
      onClose?.();
    } catch (error) {
      console.error('Failed to create company:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('socialRaison', { required: 'Company name is required' })}
          placeholder="Company Name"
        />
        {errors.socialRaison && <span className="text-red-500">{errors.socialRaison.message}</span>}
      </div>
      <div>
        <Input
          {...register('numeroCommerce', { required: 'Commerce number is required' })}
          placeholder="Commerce Number"
        />
        {errors.numeroCommerce && <span className="text-red-500">{errors.numeroCommerce.message}</span>}
      </div>
      <div>
        <Input {...register('urlImage')} placeholder="Image URL" />
      </div>
      <div>
        <Input {...register('urlSiteweb')} placeholder="Website URL" />
      </div>
      <div>
        <Input
          {...register('telephoneEnterprise', { required: 'Phone number is required' })}
          placeholder="Phone Number"
        />
        {errors.telephoneEnterprise && <span className="text-red-500">{errors.telephoneEnterprise.message}</span>}
      </div>
      <div>
        <Input
          {...register('emailEnterprise', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
          placeholder="Email"
        />
        {errors.emailEnterprise && <span className="text-red-500">{errors.emailEnterprise.message}</span>}
      </div>
      <div>
        <Input
          {...register('villeEnterprise', { required: 'City is required' })}
          placeholder="City"
        />
        {errors.villeEnterprise && <span className="text-red-500">{errors.villeEnterprise.message}</span>}
      </div>
      <div>
        <Input
          {...register('adresseEnterprise', { required: 'Address is required' })}
          placeholder="Address"
        />
        {errors.adresseEnterprise && <span className="text-red-500">{errors.adresseEnterprise.message}</span>}
      </div>
      <div>
        <Input {...register('smsESenderId')} placeholder="SMS Sender ID" />
      </div>
      <div>
        <Input
          {...register('smsCredit', { valueAsNumber: true })}
          type="number"
          placeholder="SMS Credit"
        />
      </div>
      <div>
        <Input
          {...register('activityDomain', { required: 'Activity domain is required' })}
          placeholder="Activity Domain"
        />
        {errors.activityDomain && <span className="text-red-500">{errors.activityDomain.message}</span>}
      </div>
      <div>
        <Input
          {...register('contribuableNumber', { required: 'Taxpayer number is required' })}
          placeholder="Taxpayer Number"
        />
        {errors.contribuableNumber && <span className="text-red-500">{errors.contribuableNumber.message}</span>}
      </div>
      <div>
        <Input
          {...register('pays', { required: 'Country ID is required' })}
          placeholder="Country ID"
        />
        {errors.pays && <span className="text-red-500">{errors.pays.message}</span>}
      </div>
      <Button type="submit">Create Company</Button>
    </form>
  );
};

export default CreateCompanyForm;