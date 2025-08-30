"use client";
import React from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Controller,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import {
  getCountryFlag,
} from '@/app/(dashboard)/contacts/_component/CreateContactForm';
import { FormButton } from '@/app/_components/form/FormButton';
import {
  CountrySelect,
  FormInput,
} from '@/app/_components/form/FormInput';
import { FormPasswordInput } from '@/app/_components/form/FormPasswordInput';
import LoadingUI from '@/components/loaders/LoadingUI';
import { notify } from '@/components/utilities/helper';
import { useSignup } from '@/hooks/useAuth.hook';
import { useCountries } from '@/hooks/useCountry';
import { countriesAndCities } from '@/utils/countriesAndCities';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  firstName: z.string().min(1, { message: 'validation.firstNameRequired' }),
  lastName: z.string().min(1, { message: 'validation.lastNameRequired' }),
  socialRaison: z.string().min(1, { message: 'validation.socialRaisonRequired' }),
  activityDomain: z.string().min(1, { message: 'validation.activityDomainRequired' }),
  contribuableNumber: z.string().min(1, { message: 'validation.contribuableNumberRequired' }),
  email: z.string().email({ message: 'validation.emailInvalid' }),
  emailEnterprise: z.string().email({ message: 'validation.emailEnterpriseInvalid' }),
  phoneNumber: z.string().min(9, { message: 'validation.phoneNumberRequired' }),
  telephoneEntreprise: z.string().min(9, { message: 'validation.telephoneEntrepriseRequired' }),
  country: z.string().min(1, { message: 'validation.countryRequired' }),
  city: z.string().min(1, { message: 'validation.cityRequired' }),
  address: z.string().min(1, { message: 'validation.addressRequired' }),
  smsESenderId: z.string().min(1, { message: 'validation.smsESenderIdRequired' }).max(11, { message: 'validation.smsESenderIdMax' }),
  password: z.string()
    .min(8, { message: 'passwordValidation.minLength' })
    .regex(/[A-Z]/, { message: 'passwordValidation.hasUppercase' })
    .regex(/[a-z]/, { message: 'passwordValidation.hasLowercase' })
    .regex(/[0-9]/, { message: 'passwordValidation.hasNumber' })
    .regex(/[^A-Za-z0-9]/, { message: 'passwordValidation.hasSpecial' }),
  villeEntreprise: z.string().min(1, { message: 'validation.villeEntrepriseRequired' }),
  numeroCommerce: z.string().min(1, { message: 'validation.numeroCommerceRequired' }),
  adresseEnterprise: z.string().min(1, { message: 'validation.adresseEnterpriseRequired' }),
  enterpriseCountryId: z.string().min(1, { message: 'validation.enterpriseCountryRequired' }),
  urlImage: z.string().optional(),
  urlSiteweb: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const SignUpForm = () => {
  const tRegister = useTranslations('register');
  const tCompany = useTranslations('company.addNewCompanyForm');
  const tLoading = useTranslations('loading');

  const [selectedCountry, setSelectedCountry] = React.useState<string>('');
  const [availableCities, setAvailableCities] = React.useState<Array<{ value: string; label: string }>>([]);
  const { signup, isLoading, error } = useSignup();
  const { countries } = useCountries();

  const formattedCountries = React.useMemo(() => {
    const result = countries.map(country => {
      const countryData = countriesAndCities.find(c => c.country.toLowerCase() === country.nom.toLowerCase());
      return {
        value: country.id ?? country.code.toLowerCase() ?? "",
        label: `${country.nom} - ${country.code.toLowerCase()}`,
        flag: getCountryFlag(country.code),
        cities: countryData?.cities.map(city => ({ value: city.toLowerCase(), label: city })) || []
      };
    }) || [];
    return result;
  }, [countries]);

  React.useEffect(() => {
    if (selectedCountry) {
      const country = formattedCountries.find(c => c.value === selectedCountry);
      if (country) {
        setAvailableCities(country.cities);
      } else {
        setAvailableCities([]);
      }
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      socialRaison: '',
      activityDomain: '',
      contribuableNumber: '',
      email: '',
      emailEnterprise: '',
      phoneNumber: '',
      telephoneEntreprise: '',
      country: '',
      city: '',
      address: '',
      smsESenderId: '',
      password: '',
      villeEntreprise: '',
      numeroCommerce: '',
      urlImage: '',
      urlSiteweb: '',
      adresseEnterprise: '',
      enterpriseCountryId: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    const finalData = {
      ...data,
      adresseEnterprise: data.address,
      enterpriseCountryId: data.country,
      villeEntreprise: data.city,
      numeroCommerce: data.contribuableNumber,
      urlImage: '',
      urlSiteweb: '',
    };
    console.log('Form data:', finalData);
    try {
      notify.loading(tLoading('signup.ongoing'));
      await signup({ ...finalData });
      notify.success(tLoading('signup.success'));
    } catch (error: unknown) {
      let errorMessage = tLoading('signup.error');
      type ErrorResponse = { response?: { data?: { message?: string } } };
      const err = error as ErrorResponse;
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in err &&
        typeof err.response === 'object' &&
        err.response !== null &&
        'data' in err.response &&
        typeof err.response.data === 'object' &&
        err.response.data !== null &&
        'message' in err.response.data
      ) {
        errorMessage = err.response.data.message as string;
      }
      notify.error(errorMessage);
      console.error('Client creation failed:', error);
    } finally {
      notify.dismiss();
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormSection title={tRegister('personalInformation')}>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={tRegister('firstName')}
                  placeholder={tRegister('firstNamePlaceHolder')}
                  error={errors.firstName?.message ? tRegister(errors.firstName.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={tRegister('lastName')}
                  placeholder={tRegister('lastNamePlaceHolder')}
                  error={errors.lastName?.message ? tRegister(errors.lastName.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
          </div>
        </FormSection>

        <FormSection title={tCompany('enterpriseInformation')}>
          <Controller
            name="socialRaison"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label={tCompany('socialRaison')}
                placeholder={tCompany('socialRaisonPlaceHolder')}
                error={errors.socialRaison?.message ? tCompany(errors.socialRaison.message) : ''}
                className="border-primaryAppearance"
              />
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="activityDomain"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={tCompany('activityDomain')}
                  placeholder={tCompany('activityDomainPlaceHolder')}
                  error={errors.activityDomain?.message ? tCompany(errors.activityDomain.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
            <Controller
              name="contribuableNumber"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={tCompany('contribuableNumber')}
                  placeholder={tCompany('contribuableNumberPlaceHolder')}
                  error={errors.contribuableNumber?.message ? tCompany(errors.contribuableNumber.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
          </div>
        </FormSection>

        <FormSection title={tRegister('contactInformation')}>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  type="email"
                  label={tRegister('email')}
                  placeholder={tRegister('emailPlaceHolder')}
                  error={errors.email?.message ? tRegister(errors.email.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
            <Controller
              name="emailEnterprise"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  type="email"
                  label={tCompany('emailEnterprise')}
                  placeholder={tCompany('emailEnterprisePlaceHolder')}
                  error={errors.emailEnterprise?.message ? tCompany(errors.emailEnterprise.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  type="tel"
                  label={tRegister('contactForm.phoneNumber')}
                  placeholder={tRegister('contactForm.phoneNumberPlaceHolder')}
                  error={errors.phoneNumber?.message ? tRegister(errors.phoneNumber.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
            <Controller
              name="telephoneEntreprise"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  type="tel"
                  label={tCompany('telephoneEntreprise')}
                  placeholder={tCompany('telephoneEntreprisePlaceHolder')}
                  error={errors.telephoneEntreprise?.message ? tCompany(errors.telephoneEntreprise.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
          </div>
        </FormSection>

        <FormSection title={tRegister('locationDetails')}>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{ required: tRegister('validation.countryRequired') }}
              render={({ field }) => (
                <CountrySelect
                  label={tCompany('pays')}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    setSelectedCountry(value);
                  }}
                  options={formattedCountries}
                  placeHolder={tCompany('paysPlaceHolder')}
                  placeHolderSearch={tRegister('searchLang')}
                  error={errors.country?.message ? tRegister(errors.country.message) : ''}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CountrySelect
                  label={tRegister('contactForm.city')}
                  value={field.value}
                  onChange={field.onChange}
                  options={availableCities}
                  placeHolder={tRegister('contactForm.cityPlaceHolder')}
                  placeHolderSearch={tRegister('searchLang')}
                  error={errors.city?.message ? tRegister(errors.city.message) : ''}
                  disabled={!selectedCountry}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={tRegister('contactForm.address') || 'Address'}
                  placeholder={tRegister('contactForm.addressPlaceHolder') || 'Enter address'}
                  error={errors.address?.message ? tRegister(errors.address.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
          </div>
        </FormSection>

        <FormSection title={tRegister('smsConfiguration')}>
          <Controller
            name="smsESenderId"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label={tCompany('smsESenderId')}
                placeholder={tCompany('smsESenderIdPlaceHolder')}
                error={errors.smsESenderId?.message ? tCompany(errors.smsESenderId.message) : ''}
                className="border-primaryAppearance"
              />
            )}
          />
        </FormSection>

        <FormSection title={tRegister('security')}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormPasswordInput
                {...field}
                label={tRegister('password')}
                placeholder={tRegister('passwordPlaceHolder')}
                error={errors.password?.message ? tRegister(errors.password.message) : ''}
                className="border-primaryAppearance"
              />
            )}
          />
        </FormSection>

        <FormSection title={tCompany('enterpriseInformation')}>
          <Controller
            name="socialRaison"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label={tCompany('socialRaison')}
                placeholder={tCompany('socialRaisonPlaceHolder')}
                error={errors.socialRaison?.message ? tCompany(errors.socialRaison.message) : ''}
                className="border-primaryAppearance"
              />
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="activityDomain"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={tCompany('activityDomain')}
                  placeholder={tCompany('activityDomainPlaceHolder')}
                  error={errors.activityDomain?.message ? tCompany(errors.activityDomain.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
            <Controller
              name="contribuableNumber"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={tCompany('contribuableNumber')}
                  placeholder={tCompany('contribuableNumberPlaceHolder')}
                  error={errors.contribuableNumber?.message ? tCompany(errors.contribuableNumber.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
            <Controller
              name="numeroCommerce"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={tCompany('numeroCommerce')}
                  placeholder={tCompany('numeroCommercePlaceHolder')}
                  error={errors.numeroCommerce?.message ? tCompany(errors.numeroCommerce.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
            <Controller
              name="urlSiteweb"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  type="url"
                  label={tCompany('urlSiteweb')}
                  placeholder={tCompany('urlSitewebPlaceHolder')}
                  error={errors.urlSiteweb?.message ? tCompany(errors.urlSiteweb.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
          </div>
        </FormSection>

        <FormSection title={tCompany('enterpriseLocation')}>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="enterpriseCountryId"
              control={control}
              defaultValue=""
              rules={{ required: tCompany('validation.enterpriseCountryRequired') }}
              render={({ field }) => (
                <CountrySelect
                  label={tCompany('pays')}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    setSelectedCountry(value);
                  }}
                  options={formattedCountries}
                  placeHolder={tCompany('paysPlaceHolder')}
                  placeHolderSearch={tRegister('searchLang')}
                  error={errors.enterpriseCountryId?.message ? tCompany(errors.enterpriseCountryId.message) : ''}
                />
              )}
            />
            <Controller
              name="villeEntreprise"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CountrySelect
                  label={tCompany('villeEntreprise')}
                  value={field.value}
                  onChange={field.onChange}
                  options={availableCities}
                  placeHolder={tCompany('villeEntreprisePlaceHolder')}
                  placeHolderSearch={tRegister('searchLang')}
                  error={errors.villeEntreprise?.message ? tCompany(errors.villeEntreprise.message) : ''}
                  disabled={!selectedCountry}
                />
              )}
            />
            <Controller
              name="adresseEnterprise"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  label={tCompany('adresseEnterprise')}
                  placeholder={tCompany('adresseEnterprisePlaceHolder')}
                  error={errors.adresseEnterprise?.message ? tCompany(errors.adresseEnterprise.message) : ''}
                  className="border-primaryAppearance"
                />
              )}
            />
          </div>
        </FormSection>

        <FormSection title={tRegister('additionalInformation')}>
          <Controller
            name="urlImage"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{tRegister('companyLogo')}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(URL.createObjectURL(file));
                    }
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                {errors.urlImage?.message && (
                  <p className="text-red-500 text-sm">{tCompany(errors.urlImage.message)}</p>
                )}
                {value && (
                  <img src={value} alt="Preview" className="h-20 w-20 object-cover rounded" />
                )}
              </div>
            )}
          />
        </FormSection>

        <div className="flex flex-col gap-4">
          <FormButton className="bg-primaryAppearance h-[56px]" type="submit">
            {isLoading ? <LoadingUI /> : tRegister('submit')}
          </FormButton>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error.message}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <p className="text-center w-full">
            {tRegister('loginPrompt')} <Link href="/login" className="text-primaryAppearance">{tRegister('login')}</Link>
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;

export const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

// "use client";
// import React from 'react';

// import Link from 'next/link';
// import {
//   Controller,
//   useForm,
// } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// // import { useTranslation } from 'react-i18next';
// import { z } from 'zod';

// import {
//   getCountryFlag,
// } from '@/app/(dashboard)/contacts/_component/CreateContactForm';
// import { FormButton } from '@/app/_components/form/FormButton';
// import {
//   CountrySelect,
//   FormInput,
// } from '@/app/_components/form/FormInput';
// import { FormPasswordInput } from '@/app/_components/form/FormPasswordInput';
// import LoadingUI from '@/components/loaders/LoadingUI';
// import { notify } from '@/components/utilities/helper';
// import { useSignup } from '@/hooks/useAuth.hook';
// import { useCountries } from '@/hooks/useCountry';
// import { countriesAndCities } from '@/utils/countriesAndCities';
// import { zodResolver } from '@hookform/resolvers/zod';

// const schema = z.object({
//     firstName: z.string().min(1, { message: 'First name is required' }),
//     lastName: z.string().min(1, { message: 'Last name is required' }),
//     socialRaison: z.string().min(1, { message: 'Social reason is required' }),
//     activityDomain: z.string().min(1, { message: 'Activity domain is required' }),
//     contribuableNumber: z.string().min(1, { message: 'Contribuable number is required' }),
//     email: z.string().email({ message: 'Invalid email address' }),
//     emailEnterprise: z.string().email({ message: 'Invalid enterprise email' }),
//     phoneNumber: z.string().min(9, { message: 'Phone number is required' }),
//     telephoneEntreprise: z.string().min(9, { message: 'Enterprise phone is required' }),
//     country: z.string().min(1, { message: 'Country is required' }),
//     city: z.string().min(1, { message: 'City is required' }),
//     address: z.string().min(1, { message: 'Address is required' }),
//     smsESenderId: z.string().min(1, { message: 'SMS sender ID is required' }).max(11, { message: 'SMS sender ID must not be more than 11 characters' }),
//     password: z.string()
//         .min(8, { message: 'Password must be at least 8 characters' })
//         .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
//         .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
//         .regex(/[0-9]/, { message: 'Password must contain at least one number' })
//         .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
//     villeEntreprise: z.string().min(1, { message: 'Enterprise city is required' }),
//     numeroCommerce: z.string().min(1, { message: 'Commerce number is required' }),
//     adresseEnterprise: z.string().min(1, { message: 'Enterprise address is required' }),
//     enterpriseCountryId: z.string().min(1, { message: 'Enterprise country is required' }),
//     urlImage: z.string().optional(),
//     urlSiteweb: z.string().optional(),
// });

// type FormData = z.infer<typeof schema>;

// const SignUpForm = () => {
//     const { t } = useTranslation();
//     // Add state for cities
//     const [selectedCountry, setSelectedCountry] = React.useState<string>('');
//     const [availableCities, setAvailableCities] = React.useState<Array<{ value: string; label: string }>>([]);
//     const { signup, isLoading, error } = useSignup();
//     const { countries } = useCountries (); 

//     // Transform the countries data to include flags and cities
//     const formattedCountries = React.useMemo(() => {
//         const result = countries.map(country => {
//             // Find matching country in countriesAndCities
//             const countryData = countriesAndCities.find(
//                 c => c.country.toLowerCase() === country.nom.toLowerCase()
//             );

//             return {
//                 value: country.id ?? country.code.toLowerCase() ?? "", // Ensure value is always a string
//                 label: `${country.nom} - ${country.code.toLowerCase()}`,
//                 flag: getCountryFlag(country.code),
//                 cities: countryData?.cities.map(city => ({
//                     value: city.toLowerCase(),
//                     label: city
//                 })) || []
//             };
//         }) || [];
//         return result;
//     }, [countries]);

//     // Effect to update available cities when country changes
//     React.useEffect(() => {
//         if (selectedCountry) {
//             const country = formattedCountries.find(c => c.value === selectedCountry);
//             if (country) {
//                 setAvailableCities(country.cities);
//             } else {
//                 setAvailableCities([]);
//             }
//         } else {
//             setAvailableCities([]);
//         }
//     }, [selectedCountry]);

//     const {
//         handleSubmit,
//         control,
//         formState: { errors },
//     } = useForm<FormData>({
//         resolver: zodResolver(schema),
//         mode: 'onChange', // Validate on change
//         defaultValues: {
//             firstName: '',
//             lastName: '',
//             socialRaison: '',
//             activityDomain: '',
//             contribuableNumber: '',
//             email: '',
//             emailEnterprise: '',
//             phoneNumber: '',
//             telephoneEntreprise: '',
//             country: '',
//             city: '',
//             address: '',
//             smsESenderId: '',
//             password: '',
//             villeEntreprise: '',
//             numeroCommerce: '',
//             urlImage: '',
//             urlSiteweb: '',
//             adresseEnterprise: '',
//             enterpriseCountryId: ''
//         }
//     });

//     const onSubmit = async (data: FormData) => {
//         const finalData = {
//             ...data,
//             adresseEnterprise: data.address,
//             enterpriseCountryId: data.country,
//             villeEntreprise: data.city,
//             numeroCommerce: data.contribuableNumber,
//             urlImage: '', // Assuming you will handle image upload separately
//             urlSiteweb: '', // Assuming you will handle website URL separately
//         }
//         console.log('Form data:', finalData);
//         try {
//             notify.loading('Creating client...');
//             await signup({
//                 ...finalData
//             });
//             notify.success('Client created successfully');
//             // onClose?.();
//         } catch (error: unknown) {
//             let errorMessage = 'Failed to create client';

//             type ErrorResponse = {
//                 response?: {
//                     data?: {
//                         message?: string;
//                     };
//                 };
//             };

//             const err = error as ErrorResponse;

//             if (
//                 typeof error === 'object' &&
//                 error !== null &&
//                 'response' in err &&
//                 typeof err.response === 'object' &&
//                 err.response !== null &&
//                 'data' in err.response &&
//                 typeof err.response.data === 'object' &&
//                 err.response.data !== null &&
//                 'message' in err.response.data
//             ) {
//                 errorMessage = err.response.data.message as string;
//             }
//             notify.error(errorMessage);
//             console.error('Client creation failed:', error);
//         } finally {
//             notify.dismiss();
//         }
//     };

//     return (
//         <div className=" p-4">
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//                 {/* Personal Information Section */}
//                 <FormSection title="Personal Information">
//                     <div className="grid grid-cols-2 gap-4">
//                         <Controller
//                             name="firstName"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     label="First Name"
//                                     placeholder="Enter first name"
//                                     error={errors.firstName?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="lastName"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     label="Last Name"
//                                     placeholder="Enter last name"
//                                     error={errors.lastName?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormSection>

//                 {/* Enterprise Information Section */}
//                 <FormSection title="Enterprise Information">
//                     <Controller
//                         name="socialRaison"
//                         control={control}
//                         render={({ field }) => (
//                             <FormInput 
//                                 {...field}
//                                 label="Company Name"
//                                 placeholder="Enter company name"
//                                 error={errors.socialRaison?.message}
//                                 className="border-primaryAppearance"
//                             />
//                         )}
//                     />
//                     <div className="grid grid-cols-2 gap-4">
//                         <Controller
//                             name="activityDomain"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     label="Business Sector"
//                                     placeholder="e.g. Technology, Retail"
//                                     error={errors.activityDomain?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="contribuableNumber"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     label="Tax ID"
//                                     placeholder="Enter tax ID number"
//                                     error={errors.contribuableNumber?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormSection>

//                 {/* Contact Information Section */}
//                 <FormSection title="Contact Information">
//                     <div className="grid grid-cols-2 gap-4">
//                         <Controller
//                             name="email"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     type="email"
//                                     label="Personal Email"
//                                     placeholder="name@example.com"
//                                     error={errors.email?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="emailEnterprise"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     type="email"
//                                     label="Company Email"
//                                     placeholder="company@example.com"
//                                     error={errors.emailEnterprise?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="phoneNumber"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     type="tel"
//                                     label="Personal Phone"
//                                     placeholder="+237 6XX XXX XXX"
//                                     error={errors.phoneNumber?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="telephoneEntreprise"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     type="tel"
//                                     label="Company Phone"
//                                     placeholder="+237 6XX XXX XXX"
//                                     error={errors.telephoneEntreprise?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormSection>

//                 {/* Location Section */}
//                 <FormSection title="Location Details">
//                     <div className="grid grid-cols-2 gap-4">

//                         <Controller
//                             name="country"
//                             control={control}
//                             defaultValue=""
//                             rules={{ required: 'Country is required' }}
//                             render={({ field }) => (
//                                 <CountrySelect
//                                     label="Select Country"
//                                     value={field.value}
//                                     // onChange={field.onChange}
//                                     onChange={(value) => {
//                                         field.onChange(value);  // Update form value
//                                         setSelectedCountry(value);  // Update selected country for city filtering
//                                     }}
//                                     options={formattedCountries}
//                                     placeHolder="Choose a country"
//                                     placeHolderSearch="Type to search countries..."
//                                     error={errors.country?.message} // Include error for country
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="city"
//                             control={control}
//                             defaultValue=""
//                             render={({ field }) => (
//                                 <CountrySelect
//                                     label="Select City"
//                                     value={field.value}
//                                     onChange={field.onChange}
//                                     options={availableCities}
//                                     placeHolder="Choose a city"
//                                     placeHolderSearch="Type to search cities..."
//                                     error={errors.city?.message}
//                                     disabled={!selectedCountry}
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="address"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     label="Address"
//                                     placeholder="Enter address"
//                                     error={errors.address?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormSection>

//                 {/* SMS Configuration Section */}
//                 <FormSection title="SMS Configuration">
//                     <Controller
//                         name="smsESenderId"
//                         control={control}
//                         render={({ field }) => (
//                             <FormInput 
//                                 {...field}
//                                 label="SMS Sender ID"
//                                 placeholder="Enter sender ID"
//                                 error={errors.smsESenderId?.message}
//                                 className="border-primaryAppearance"
//                             />
//                         )}
//                     />
//                 </FormSection>

//                 {/* Security Section */}
//                 <FormSection title="Security">
//                     <Controller
//                         name="password"
//                         control={control}
//                         render={({ field }) => (
//                             <FormPasswordInput 
//                                 {...field}
//                                 label="Password"
//                                 placeholder="Enter secure password"
//                                 error={errors.password?.message}
//                                 className="border-primaryAppearance"
//                             />
//                         )}
//                     />
//                 </FormSection>

//                 {/* Enterprise Information Section */}
//                 <FormSection title="Enterprise Information">
//                     <Controller
//                         name="socialRaison"
//                         control={control}
//                         render={({ field }) => (
//                             <FormInput 
//                                 {...field}
//                                 label="Company Name"
//                                 placeholder="Enter company name"
//                                 error={errors.socialRaison?.message}
//                                 className="border-primaryAppearance"
//                             />
//                         )}
//                     />
//                     <div className="grid grid-cols-2 gap-4">
//                         <Controller
//                             name="activityDomain"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     label="Business Sector"
//                                     placeholder="e.g. Technology, Retail"
//                                     error={errors.activityDomain?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="contribuableNumber"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     label="Tax ID"
//                                     placeholder="Enter tax ID number"
//                                     error={errors.contribuableNumber?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="numeroCommerce"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     label="Commerce Number"
//                                     placeholder="Enter commerce registration number"
//                                     error={errors.numeroCommerce?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="urlSiteweb"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     type="url"
//                                     label="Website URL"
//                                     placeholder="https://example.com"
//                                     error={errors.urlSiteweb?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormSection>

//                 {/* Enterprise Location Section */}
//                 <FormSection title="Enterprise Location">
//                     <div className="grid grid-cols-2 gap-4">
//                         <Controller
//                             name="enterpriseCountryId"
//                             control={control}
//                             defaultValue=""
//                             rules={{ required: 'Enterprise Country is required' }}
//                             render={({ field }) => (
//                                 <CountrySelect
//                                     label="Enterprise Country"
//                                     value={field.value}
//                                     onChange={(value) => {
//                                         field.onChange(value);  // Update form value
//                                         setSelectedCountry(value);  // Update selected country for city filtering
//                                     }}
//                                     options={formattedCountries}
//                                     placeHolder="Select enterprise country"
//                                     placeHolderSearch="Type to search countries..."
//                                     error={errors.enterpriseCountryId?.message} // Include error for country
//                                 />
//                             )}
//                         />

//                         <Controller
//                             name="villeEntreprise"
//                             control={control}
//                             defaultValue=""
//                             render={({ field }) => (
//                                 <CountrySelect
//                                     label="Enterprise City"
//                                     value={field.value}
//                                     onChange={field.onChange}
//                                     options={availableCities}
//                                     placeHolder="Enter enterprise city"
//                                     placeHolderSearch="Type to search cities..."
//                                     error={errors.villeEntreprise?.message}
//                                     disabled={!selectedCountry}
//                                 />
//                             )}
//                         />

//                         <Controller
//                             name="adresseEnterprise"
//                             control={control}
//                             render={({ field }) => (
//                                 <FormInput 
//                                     {...field}
//                                     label="Enterprise Address"
//                                     placeholder="Enter enterprise address"
//                                     error={errors.adresseEnterprise?.message}
//                                     className="border-primaryAppearance"
//                                 />
//                             )}
//                         />
//                     </div>
//                 </FormSection>

//                 {/* File Upload Section */}
//                 <FormSection title="Additional Information">
//                     <Controller
//                         name="urlImage"
//                         control={control}
//                         render={({ field: { onChange, value } }) => (
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Company Logo
//                                 </label>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={(e) => {
//                                         const file = e.target.files?.[0];
//                                         if (file) {
//                                             // Handle file upload here
//                                             onChange(URL.createObjectURL(file));
//                                         }
//                                     }}
//                                     className="block w-full text-sm text-gray-500
//                                         file:mr-4 file:py-2 file:px-4
//                                         file:rounded-full file:border-0
//                                         file:text-sm file:font-semibold
//                                         file:bg-violet-50 file:text-violet-700
//                                         hover:file:bg-violet-100"
//                                 />
//                                 {errors.urlImage?.message && (
//                                     <p className="text-red-500 text-sm">{errors.urlImage.message}</p>
//                                 )}
//                                 {value && (
//                                     <img src={value} alt="Preview" className="h-20 w-20 object-cover rounded" />
//                                 )}
//                             </div>
//                         )}
//                     />
//                 </FormSection>

//                 <div className='flex flex-col gap-4'>
//                     <FormButton className='bg-primaryAppearance h-[56px]' type="submit">{ isLoading ? (
//                         <LoadingUI />
//                     ) : "Submit" }</FormButton>
//                     {error && (
//                         <div className="text-red-500 text-sm text-center">
//                             {error.message}
//                         </div>
//                     )}
//                 </div>

//                 <div className='flex items-center justify-center'>
//                     <p className='text-center w-full'>
//                         {t('register.loginPrompt')} <Link href={"/login"} className='text-primaryAppearance'>{t('register.login')}</Link> 
//                     </p>
//                 </div>

//                 {error && (
//                     <div className="text-red-500 text-sm text-center">
//                         {error.message}
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default SignUpForm;


// export const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
//     <div className="space-y-4">
//         <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">{title}</h3>
//         <div className="space-y-4">
//             {children}
//         </div>
//     </div>
// );