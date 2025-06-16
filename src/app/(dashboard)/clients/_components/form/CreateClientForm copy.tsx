"use client";
import React from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
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
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    socialRaison: z.string().min(1, { message: 'Social reason is required' }),
    activityDomain: z.string().min(1, { message: 'Activity domain is required' }),
    contribuableNumber: z.string().min(1, { message: 'Contribuable number is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    emailEnterprise: z.string().email({ message: 'Invalid enterprise email' }),
    phoneNumber: z.string().min(9, { message: 'Phone number is required' }),
    telephoneEntreprise: z.string().min(9, { message: 'Enterprise phone is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    smsESenderId: z.string().min(1, { message: 'SMS sender ID is required' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    villeEntreprise: z.string().min(1, { message: 'Enterprise city is required' }),
    numeroCommerce: z.string().min(1, { message: 'Commerce number is required' }),
    adresseEnterprise: z.string().min(1, { message: 'Enterprise address is required' }),
    enterpriseCountryId: z.string().min(1, { message: 'Enterprise country is required' }),
    // villeEntreprise: z.string().optional(),
    // numeroCommerce: z.string().optional(),
    // adresseEnterprise: z.string().optional(),
    // enterpriseCountryId: z.string().optional(),
    urlImage: z.string().optional(),
    urlSiteweb: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CreateClientForm = ({ onClose }: { onClose?: () => void }) => {
    // const { t } = useTranslation();
    // const { createClient, isLoading } = useClients();
    // Add state for cities
    const [selectedCountry, setSelectedCountry] = React.useState<string>('');
    const [availableCities, setAvailableCities] = React.useState<Array<{ value: string; label: string }>>([]);
    // const [availableCitiesEnt, setAvailableCitiesEnt] = React.useState<Array<{ value: string; label: string }>>([]);

    const { signup, isLoading, error } = useSignup();

    const { countries } = useCountries (); 

    // console.log('Countries:', countries);

    const countriesData = countriesAndCities

    console.log(countriesData, "Countries data and cities")

    // // Transform the countries data to include flags
    // const formattedCountries = React.useMemo(() => {
    //     const result = countries.map(country => ({
    //         // value: country.code.toLowerCase(),
    //         value: country.id ?? country.code.toLowerCase() ?? "", // Ensure value is always a string
    //         label: `${country.nom} - ${country.code.toLowerCase()}`,
    //         flag: getCountryFlag(country.code)
    //     })) || [];
    //     console.log('Formatted Countries:', result);
    //     return result
    // }, [countries]);

    // Transform the countries data to include flags and cities
    const formattedCountries = React.useMemo(() => {
        const result = countries.map(country => {
            // Find matching country in countriesAndCities
            const countryData = countriesAndCities.find(
                c => c.country.toLowerCase() === country.nom.toLowerCase()
            );

            return {
                value: country.id ?? country.code.toLowerCase() ?? "", // Ensure value is always a string
                label: `${country.nom} - ${country.code.toLowerCase()}`,
                flag: getCountryFlag(country.code),
                cities: countryData?.cities.map(city => ({
                    value: city.toLowerCase(),
                    label: city
                })) || []
            };
        }) || [];
        return result;
    }, [countries]);

    // Effect to update available cities when country changes
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
        mode: 'onChange', // Validate on change
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
        // console.log('Form data:', data);

        const finalData = {
            ...data,
            adresseEnterprise: data.address,
            enterpriseCountryId: data.country,
            villeEntreprise: data.city,
            numeroCommerce: data.contribuableNumber,
            urlImage: '', // Assuming you will handle image upload separately
            urlSiteweb: '', // Assuming you will handle website URL separately
        }
        console.log('Form data:', finalData);
        // return
        try {
            notify.loading('Creating client...');
            await signup({
                ...finalData
            });
            notify.success('Client created successfully');
            onClose?.();
        } catch (error: unknown) {
            let errorMessage = 'Failed to create client';

            type ErrorResponse = {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
            };

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
        <div className="max-h-[80vh] overflow-y-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Section */}
                <FormSection title="Personal Information">
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="First Name"
                                    placeholder="Enter first name"
                                    error={errors.firstName?.message}
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
                                    label="Last Name"
                                    placeholder="Enter last name"
                                    error={errors.lastName?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* Enterprise Information Section */}
                <FormSection title="Enterprise Information">
                    <Controller
                        name="socialRaison"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                label="Company Name"
                                placeholder="Enter company name"
                                error={errors.socialRaison?.message}
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
                                    label="Business Sector"
                                    placeholder="e.g. Technology, Retail"
                                    error={errors.activityDomain?.message}
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
                                    label="Tax ID"
                                    placeholder="Enter tax ID number"
                                    error={errors.contribuableNumber?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* Contact Information Section */}
                <FormSection title="Contact Information">
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    type="email"
                                    label="Personal Email"
                                    placeholder="name@example.com"
                                    error={errors.email?.message}
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
                                    label="Company Email"
                                    placeholder="company@example.com"
                                    error={errors.emailEnterprise?.message}
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
                                    label="Personal Phone"
                                    placeholder="+237 6XX XXX XXX"
                                    error={errors.phoneNumber?.message}
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
                                    label="Company Phone"
                                    placeholder="+237 6XX XXX XXX"
                                    error={errors.telephoneEntreprise?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* Location Section */}
                <FormSection title="Location Details">
                    <div className="grid grid-cols-2 gap-4">
                        {/* <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="Country"
                                    placeholder="Select country"
                                    error={errors.country?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        /> */}
                        <Controller
                            name="country"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Country is required' }}
                            render={({ field }) => (
                                <CountrySelect
                                    label="Select Country"
                                    value={field.value}
                                    // onChange={field.onChange}
                                    onChange={(value) => {
                                        field.onChange(value);  // Update form value
                                        setSelectedCountry(value);  // Update selected country for city filtering
                                    }}
                                    options={formattedCountries}
                                    placeHolder="Choose a country"
                                    placeHolderSearch="Type to search countries..."
                                    error={errors.country?.message} // Include error for country
                                />
                            )}
                        />
                        {/* <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="City"
                                    placeholder="Enter city"
                                    error={errors.city?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        /> */}
                        <Controller
                            name="city"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <CountrySelect
                                    label="Select City"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={availableCities}
                                    placeHolder="Choose a city"
                                    placeHolderSearch="Type to search cities..."
                                    error={errors.city?.message}
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
                                    label="Address"
                                    placeholder="Enter address"
                                    error={errors.address?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* SMS Configuration Section */}
                <FormSection title="SMS Configuration">
                    <Controller
                        name="smsESenderId"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                label="SMS Sender ID"
                                placeholder="Enter sender ID"
                                error={errors.smsESenderId?.message}
                                className="border-primaryAppearance"
                            />
                        )}
                    />
                </FormSection>


                <FormSection title="Security">
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <FormPasswordInput 
                                {...field}
                                label="Password"
                                placeholder="Enter secure password"
                                error={errors.password?.message}
                                className="border-primaryAppearance"
                            />
                        )}
                    />
                </FormSection>

                {/* Enterprise Information Section */}
                <FormSection title="Enterprise Information">
                    <Controller
                        name="socialRaison"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                label="Company Name"
                                placeholder="Enter company name"
                                error={errors.socialRaison?.message}
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
                                    label="Business Sector"
                                    placeholder="e.g. Technology, Retail"
                                    error={errors.activityDomain?.message}
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
                                    label="Tax ID"
                                    placeholder="Enter tax ID number"
                                    error={errors.contribuableNumber?.message}
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
                                    label="Commerce Number"
                                    placeholder="Enter commerce registration number"
                                    error={errors.numeroCommerce?.message}
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
                                    label="Website URL"
                                    placeholder="https://example.com"
                                    error={errors.urlSiteweb?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* Enterprise Location Section */}
                <FormSection title="Enterprise Location">
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="enterpriseCountryId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Enterprise Country is required' }}
                            render={({ field }) => (
                                <CountrySelect
                                    label="Enterprise Country"
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value);  // Update form value
                                        setSelectedCountry(value);  // Update selected country for city filtering
                                    }}
                                    options={formattedCountries}
                                    placeHolder="Select enterprise country"
                                    placeHolderSearch="Type to search countries..."
                                    error={errors.enterpriseCountryId?.message} // Include error for country
                                />
                            )}
                        />
                        {/* <Controller
                            name="enterpriseCountryId"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="Enterprise Country"
                                    placeholder="Select enterprise country"
                                    error={errors.enterpriseCountryId?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        /> */}
                        <Controller
                            name="villeEntreprise"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <CountrySelect
                                    label="Enterprise City"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={availableCities}
                                    placeHolder="Enter enterprise city"
                                    placeHolderSearch="Type to search cities..."
                                    error={errors.villeEntreprise?.message}
                                    disabled={!selectedCountry}
                                />
                            )}
                        />
                        {/* <Controller
                            name="villeEntreprise"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="Enterprise City"
                                    placeholder="Enter enterprise city"
                                    error={errors.villeEntreprise?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        /> */}
                        <Controller
                            name="adresseEnterprise"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    label="Enterprise Address"
                                    placeholder="Enter enterprise address"
                                    error={errors.adresseEnterprise?.message}
                                    className="border-primaryAppearance"
                                />
                            )}
                        />
                    </div>
                </FormSection>

                {/* File Upload Section */}
                <FormSection title="Additional Information">
                    <Controller
                        name="urlImage"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Company Logo
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            // Handle file upload here
                                            onChange(URL.createObjectURL(file));
                                        }
                                    }}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50 file:text-violet-700
                                        hover:file:bg-violet-100"
                                />
                                {errors.urlImage?.message && (
                                    <p className="text-red-500 text-sm">{errors.urlImage.message}</p>
                                )}
                                {value && (
                                    <img src={value} alt="Preview" className="h-20 w-20 object-cover rounded" />
                                )}
                            </div>
                        )}
                    />
                </FormSection>

                {/* <FormButton 
                    type="submit" 
                    className="w-full bg-primaryAppearance text-white py-3 rounded-lg"
                    disabled={isLoading}
                >
                    {isLoading ? <LoadingUI /> : 'Create Client'}
                </FormButton> */}

                <div className='flex flex-col gap-4'>
                    <FormButton className='bg-primaryAppearance h-[56px]' type="submit">{ isLoading ? (
                        <LoadingUI />
                    ) : "Submit" }</FormButton>
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error.message}
                        </div>
                    )}
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

export default CreateClientForm;


const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);