import React from 'react';

import { useRouter } from 'next/navigation';
import {
  Controller,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
  getCountryFlag,
} from '@/app/(dashboard)/contacts/_component/CreateContactForm';
import { FormSection } from '@/app/(login)/sign-up/_components/SignUpForm';
import { FormButton } from '@/app/_components/form/FormButton';
import {
  CountrySelect,
  FormInput,
} from '@/app/_components/form/FormInput';
import { FormPasswordInput } from '@/app/_components/form/FormPasswordInput';
import LoadingUI from '@/components/loaders/LoadingUI';
import { notify } from '@/components/utilities/helper';
import { useClients } from '@/hooks/useClients';
import { useCountries } from '@/hooks/useCountry';
import { useContactStore } from '@/stores/contacts.store';
import { USER_ROLE } from '@/utils/constants';
import { countriesAndCities } from '@/utils/countriesAndCities';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().min(7, { message: 'Phone number must be at least 10 digits' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    confirmPassword: z.string(), 
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type FormData = z.infer<typeof schema>;

const CreateClientForm = ({ onClose }: { onClose?: () => void }) => {

    const { t } = useTranslation();

    const { toggleModal } = useContactStore();

    const [selectedCountry, setSelectedCountry] = React.useState<string>('');
        const [availableCities, setAvailableCities] = React.useState<Array<{ value: string; label: string }>>([]);

    // const { signup, isLoading, error } = useSignup(); 
    const { createClient, isLoading, error } = useClients();

    const { countries } = useCountries (); 

    const router = useRouter();

    const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

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

    // Watch password fields for real-time validation
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    // Password validation checks
    const passwordChecks = {
        minLength: password?.length >= 8,
        hasUppercase: /[A-Z]/.test(password || ''),
        hasLowercase: /[a-z]/.test(password || ''),
        hasNumber: /[0-9]/.test(password || ''),
        hasSpecial: /[^A-Za-z0-9]/.test(password || ''),
        matches: password === confirmPassword && password !== undefined,
    };

    // Add this before the return statement
    const ValidationIndicator = ({ isValid }: { isValid: boolean }) => (
        <span className={`inline-block w-4 h-4 rounded-full ${isValid ? 'bg-green-500' : 'bg-red-500'}`}>
            {isValid ? '✓' : ''}
        </span>
    );

    // const countriesData = countriesAndCities

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

    const onSubmit = async (data: FormData) => {
        console.log(data);
        notify.loading(t('loading.signup.ongoing'));
        const final_data = {
            ...data,
            role: USER_ROLE as "USER" | "SUPER_ADMIN" | "ADMIN_USER"
        }
        try {
            console.log('Form data:', final_data);

            await createClient(final_data);
            notify.dismiss();
            notify.success(t('loading.signup.success'));
            // Optionally, you can redirect the user or perform other actions here
            // Handle successful login, e.g., redirect to dashboard
            router.push('/dashboard');
            reset();
            toggleModal(false);
            toggleModal(undefined as unknown as boolean); // Close the modal
            onClose?.();
        } catch (error: unknown) {
            notify.success(t('loading.signup.error'));
            if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                // @ts-expect-error: dynamic error shape
                notify.error(error.response.data.message);
            }
            console.error('Login failed:', error);
        } finally {
            notify.dismiss();
        }
    };

    return (
        <div className='max-h-[80vh] overflow-y-auto overflow-x-hidden'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <div className='flex justify-around flex-row gap-3 w-full '>
                    <div className='flex flex-col gap-2 w-full'>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    className='border-primaryAppearance h-[56px] flex-1 w-full'
                                    label={t('register.firstName')}
                                    placeholder={t('register.firstNamePlaceHolder')}
                                    error={errors.firstName?.message}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <FormInput 
                                    {...field}
                                    className='border-primaryAppearance h-[56px] flex-1 w-full'
                                    label={t('register.lastName')}
                                    placeholder={t('register.lastNamePlaceHolder')}
                                    error={errors.lastName?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                className='border-primaryAppearance h-[56px] flex-1 w-full'
                                label="Email" type={t('register.email')}
                                placeholder={t('register.emailPlaceHolder')} 
                                error={errors.email?.message}
                            />
                        )}
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <FormInput 
                                {...field}
                                className='border-primaryAppearance' 
                                type="number"
                                label={t('contact.contactForm.phoneNumber')}
                                placeholder={t('contact.contactForm.phoneNumberPlaceHolder')}
                                error={errors.phoneNumber?.message}
                            />
                        )}
                    />
                </div>
                
                <FormSection title="Location Details">
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
                </FormSection>

                <div className='flex flex-col gap-2 w-full'>
                    
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

                <div className='flex flex-col gap-2 w-full'>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <FormPasswordInput 
                                    {...field}
                                    className='border-primaryAppearance h-[56px] flex-1 w-full'
                                    label={t('register.password')}
                                    placeholder={t('register.passwordPlaceHolder')} 
                                    error={errors.password?.message}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                <div className={`
                                    absolute left-[100%] top-full w-72 ml-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10
                                    transition-all duration-200 
                                    ${isPasswordFocused && field.value 
                                        ? 'opacity-100 translate-y-[-40%] pointer-events-auto' 
                                        : 'opacity-0 -translate-y-2 pointer-events-none'}
                                `}>
                                    <div className="flex items-center gap-2">
                                        <ValidationIndicator isValid={passwordChecks.minLength} />
                                        <span>{t('register.passwordValidation.minLength')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ValidationIndicator isValid={passwordChecks.hasUppercase} />
                                        <span>{t('register.passwordValidation.hasUppercase')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ValidationIndicator isValid={passwordChecks.hasLowercase} />
                                        <span>{t('register.passwordValidation.hasLowercase')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ValidationIndicator isValid={passwordChecks.hasNumber} />
                                        <span>{t('register.passwordValidation.hasNumber')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ValidationIndicator isValid={passwordChecks.hasSpecial} />
                                        <span>{t('register.passwordValidation.hasSpecial')}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <>
                                <FormPasswordInput 
                                    {...field}
                                    className='border-primaryAppearance h-[56px] flex-1 w-full'
                                    label={t('register.confirmPassword')}
                                    placeholder={t('register.confirmPasswordPlaceHolder')}
                                    error={errors.confirmPassword?.message}
                                />
                                <div className="text-sm mt-2">
                                    <div className="flex items-center gap-2">
                                        <ValidationIndicator isValid={passwordChecks.matches} />
                                        <div>
                                            {passwordChecks.matches ? <span className='text-green-500'>
                                                {t('register.passwordMatch')}
                                            </span> : <span className='text-red-500'>
                                                {t('register.passwordMismatch')}
                                            </span>}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    />
                </div>
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
            </form>
        </div>
    )
}

export default CreateClientForm