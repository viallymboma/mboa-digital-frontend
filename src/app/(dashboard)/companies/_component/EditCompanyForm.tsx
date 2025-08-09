'use client';
import React from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { notify } from '@/components/utilities/helper';
import { useCompanies } from '@/hooks/useCompanies';
import {
  CreateCompanyRequestType,
  EnterpriseType,
} from '@/types/company';

interface EditCompanyFormProps {
  company: EnterpriseType;
}

const EditCompanyForm: React.FC<EditCompanyFormProps> = ({ company }) => {
  const { t } = useTranslation();
  const { updateCompany } = useCompanies();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCompanyRequestType>({
    defaultValues: {
      socialRaison: company.socialRaison,
      numeroCommerce: company.numeroCommerce,
      urlImage: company.urlImage || '',
      urlSiteweb: company.urlSiteweb || '',
      telephoneEnterprise: company.telephoneEnterprise,
      emailEnterprise: company.emailEnterprise,
      villeEnterprise: company.villeEnterprise,
      adresseEnterprise: company.adresseEnterprise,
      smsESenderId: company.smsESenderId || '',
      smsCredit: company.smsCredit,
      activityDomain: company.activityDomain,
      contribuableNumber: company.contribuableNumber || '',
      pays: company.pays.id,
    },
  });

  const onSubmit = async (data: CreateCompanyRequestType) => {
    try {
      await updateCompany({
          ...data, id: company.id,
          company: {
              socialRaison: '',
              numeroCommerce: '',
              urlImage: '',
              urlSiteweb: '',
              telephoneEnterprise: '',
              emailEnterprise: '',
              villeEnterprise: '',
              adresseEnterprise: '',
              smsESenderId: '',
              smsCredit: 0,
              activityDomain: '',
              contribuableNumber: '',
              pays: ''
          }
      });
      notify.success(t('company.addNewCompanyForm.success', { defaultValue: 'Company updated successfully' }));
    //   document.querySelector("button[aria-label='Close']")?.click();
    } catch (error) {
      console.error('Failed to update company:', error);
      notify.error(t('company.addNewCompanyForm.error', { defaultValue: 'Failed to update company' }));
    }
  }; 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id={`edit-company-${company.id}`} className="hidden">
          {t('company.editCompany', { defaultValue: 'Edit Company' })}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('company.addNewCompanyForm.title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('socialRaison', { required: t('company.addNewCompanyForm.socialRaisonRequired', { defaultValue: 'Company name is required' }) })}
              placeholder={t('company.addNewCompanyForm.socialRaisonPlaceHolder')}
            />
            {errors.socialRaison && <span className="text-red-500">{errors.socialRaison.message}</span>}
          </div>
          <div>
            <Input
              {...register('numeroCommerce', { required: t('company.addNewCompanyForm.numeroCommerceRequired', { defaultValue: 'Commerce number is required' }) })}
              placeholder={t('company.addNewCompanyForm.numeroCommercePlaceHolder')}
            />
            {errors.numeroCommerce && <span className="text-red-500">{errors.numeroCommerce.message}</span>}
          </div>
          <div>
            <Input {...register('urlImage')} placeholder={t('company.addNewCompanyForm.urlImagePlaceHolder')} />
          </div>
          <div>
            <Input {...register('urlSiteweb')} placeholder={t('company.addNewCompanyForm.urlSitewebPlaceHolder')} />
          </div>
          <div>
            <Input
              {...register('telephoneEnterprise', { required: t('company.addNewCompanyForm.telephoneEnterpriseRequired', { defaultValue: 'Phone number is required' }) })}
              placeholder={t('company.addNewCompanyForm.telephoneEnterprisePlaceHolder')}
            />
            {errors.telephoneEnterprise && <span className="text-red-500">{errors.telephoneEnterprise.message}</span>}
          </div>
          <div>
            <Input
              {...register('emailEnterprise', { 
                required: t('company.addNewCompanyForm.emailEnterpriseRequired', { defaultValue: 'Email is required' }), 
                pattern: { value: /^\S+@\S+$/i, message: t('company.addNewCompanyForm.emailInvalid', { defaultValue: 'Invalid email' }) }
              })}
              placeholder={t('company.addNewCompanyForm.emailEnterprisePlaceHolder')}
            />
            {errors.emailEnterprise && <span className="text-red-500">{errors.emailEnterprise.message}</span>}
          </div>
          <div>
            <Input
              {...register('villeEnterprise', { required: t('company.addNewCompanyForm.villeEnterpriseRequired', { defaultValue: 'City is required' }) })}
              placeholder={t('company.addNewCompanyForm.villeEnterprisePlaceHolder')}
            />
            {errors.villeEnterprise && <span className="text-red-500">{errors.villeEnterprise.message}</span>}
          </div>
          <div>
            <Input
              {...register('adresseEnterprise', { required: t('company.addNewCompanyForm.adresseEnterpriseRequired', { defaultValue: 'Address is required' }) })}
              placeholder={t('company.addNewCompanyForm.adresseEnterprisePlaceHolder')}
            />
            {errors.adresseEnterprise && <span className="text-red-500">{errors.adresseEnterprise.message}</span>}
          </div>
          <div>
            <Input {...register('smsESenderId')} placeholder={t('company.addNewCompanyForm.smsESenderIdPlaceHolder')} />
          </div>
          <div>
            <Input
              {...register('smsCredit', { valueAsNumber: true })}
              type="number"
              placeholder={t('company.addNewCompanyForm.smsCreditPlaceHolder')}
            />
          </div>
          <div>
            <Input
              {...register('activityDomain', { required: t('company.addNewCompanyForm.activityDomainRequired', { defaultValue: 'Activity domain is required' }) })}
              placeholder={t('company.addNewCompanyForm.activityDomainPlaceHolder')}
            />
            {errors.activityDomain && <span className="text-red-500">{errors.activityDomain.message}</span>}
          </div>
          <div>
            <Input
              {...register('contribuableNumber', { required: t('company.addNewCompanyForm.contribuableNumberRequired', { defaultValue: 'Taxpayer number is required' }) })}
              placeholder={t('company.addNewCompanyForm.contribuableNumberPlaceHolder')}
            />
            {errors.contribuableNumber && <span className="text-red-500">{errors.contribuableNumber.message}</span>}
          </div>
          <div>
            <Input
              {...register('pays', { required: t('company.addNewCompanyForm.paysRequired', { defaultValue: 'Country ID is required' }) })}
              placeholder={t('company.addNewCompanyForm.paysPlaceHolder')}
            />
            {errors.pays && <span className="text-red-500">{errors.pays.message}</span>}
          </div>
          <Button type="submit">{t('company.addNewCompanyForm.buttonLabel')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCompanyForm;