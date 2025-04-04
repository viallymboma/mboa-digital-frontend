"use client";
import React from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
  AmountInput,
  CountrySelect,
  FormInput,
} from '@/app/_components/form/FormInput';
import { FormTextArea } from '@/app/_components/form/FormTextArea';
import { AddNewContactSvgIcon } from '@/app/svg_components/SvgIcons';
import { zodResolver } from '@hookform/resolvers/zod';

// Define schema validation using Zod
const schema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
  contactPhone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  amount: z.string().min(10, { message: 'Amount is required' }),
  city: z.string().min(1, { message: 'City is required' }),
});

type FormData = z.infer<typeof schema>;

const countries = [
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "de", label: "Germany", flag: "🇩🇪" },
  { value: "jp", label: "Japan", flag: "🇯🇵" },
  { value: "in", label: "India", flag: "🇮🇳" },
  { value: "cn", label: "China", flag: "🇨🇳" },
  { value: "ca", label: "Canada", flag: "🇨🇦" },
  { value: "au", label: "Australia", flag: "🇦🇺" },
  { value: "br", label: "Brazil", flag: "🇧🇷" },
];

const CompleteContactForm = () => {
    const { t } = useTranslation();

    // Initialize react-hook-form with resolver
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log('New Contact:', data);
    };

    return (
        <div className='max-h-[500px] overflow-y-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
                <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            label={t('contact.contactForm.fullName')}
                            placeholder={t('contact.contactForm.fullNamePlaceHolder')}
                            error={errors.fullName?.message}
                        />
                    )}
                />

                <Controller
                    name="contactPhone"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field} 
                            type="number"
                            label={t('contact.contactForm.phoneNumber')}
                            placeholder={t('contact.contactForm.phoneNumberPlaceHolder')}
                            error={errors.contactPhone?.message}
                        />
                    )}
                />

                

                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                        {...field} 
                        label={t('contact.contactForm.city')}
                        placeholder={t('contact.contactForm.cityPlaceHolder')}
                        error={errors.city?.message}
                        />
                    )}
                />

                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => <AmountInput label="Amount" placeholder="Enter amount" {...field} />}
                />

                <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Country is required' }}
                    render={({ field }) => (
                        <CountrySelect
                            {...field}
                            label="Country"
                            options={countries}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.country?.message} // Include error for country
                        />
                    )}
                />

                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => <FormTextArea label="Message" placeholder="Enter your message" {...field}  />}
                />

                <div className='flex flex-col gap-4'>
                    <button type="submit" className='flex flex-row rounded-lg justify-center gap-3 bg-primaryAppearance p-[1.5rem]'>
                        <AddNewContactSvgIcon color="white" />
                        <span className='text-[18px] text-white'>{t('contact.contactForm.buttonLabel')}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompleteContactForm;














// "use client";
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

// import FormInput from '@/app/_components/form/FormInput';
// import { AddNewContactSvgIcon } from '@/app/svg_components/SvgIcons';

// // Define schema validation using Zod
// const schema = z.object({
//   fullName: z.string().min(1, { message: 'Full name is required' }),
//   contactPhone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
//   city: z.string().min(1, { message: 'City is required' }),
// });

// type FormData = z.infer<typeof schema>;

// const CompleteContactForm = () => {
//   const { t } = useTranslation();

//   // Initialize react-hook-form with resolver
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = (data: FormData) => {
//     console.log('New Contact:', data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
//         <FormInput<FormData>
//           name="fullName"
//           placeholder={t('contact.contactForm.fullNamePlaceHolder')}
//           register={register}
//           error={errors.fullName?.message}
//         />
//         <FormInput<FormData>
//           name="contactPhone"
//           placeholder={t('contact.contactForm.phoneNumber')}
//           type="number"
//           register={register}
//           error={errors.contactPhone?.message}
//         />
//         <FormInput<FormData>
//           name="city"
//           placeholder={t('contact.contactForm.cityPlaceHolder')}
//           register={register}
//           error={errors.city?.message}
//         />

//         <div className='flex flex-col gap-4'>
//           <button type='submit' className='flex flex-row rounded-lg justify-center gap-3 bg-primaryAppearance p-[1.5rem]'>
//             <AddNewContactSvgIcon color='white' />
//             <span className='text-[18px] text-white'>{t('contact.contactForm.buttonLabel')}</span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CompleteContactForm;




















// "use client";
// import React from 'react';

// import { useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { z } from 'zod';

// import FormInput from '@/app/_components/form/FormInput';
// import { AddNewContactSvgIcon } from '@/app/svg_components/SvgIcons';
// // import { Button } from '@/components/ui/button';
// import { zodResolver } from '@hookform/resolvers/zod';

// // Define schema validation using Zod
// const schema = z.object({
//     fullName: z.string().min(1, { message: 'Full name is required' }),
//     contactPhone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
//     city: z.string().min(1, { message: 'City is required' }),
// });

// type FormData = z.infer<typeof schema>;

// const CompleteContactForm = () => {
//     const { t } = useTranslation();

//     const { handleSubmit, register } = useForm<FormData>({
//         resolver: zodResolver(schema),
//     });

//     const onSubmit = (data: FormData) => {
//         console.log('New Contact:', data);
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
//                 <FormInput 
//                     className='h-[56px]' 
//                     // name="fullName" 
//                     placeholder={t('contact.contactForm.fullNamePlaceHolder')} 
//                     label={""} 
//                     // label={t('contact.contactForm.fullName')} 
//                     {...register("fullName")} 
//                 />
//                 <FormInput 
//                     className='h-[56px]' 
//                     // name="contactPhone" 
//                     placeholder={t('contact.contactForm.phoneNumber')} 
//                     label={""} 
//                     // label={t('contact.contactForm.phoneNumber')} 
//                     type="number" 
//                     {...register("contactPhone")}
//                 />
//                 <FormInput 
//                     className='h-[56px]' 
//                     // name="city" 
//                     placeholder={t('contact.contactForm.cityPlaceHolder')} 
//                     label={""} 
//                     // label={t('contact.contactForm.cityPlaceHolder')} 
//                     {...register("city")}
//                 />
//                 <div className='flex flex-col gap-4'>
//                     {/* <FormButton className='bg-primaryAppearance h-[56px]' type="submit">
//                         {t('contact.contactForm.submit')}
//                     </FormButton> */}
//                     <button type='submit' className='flex flex-row rounded-lg justify-center gap-3 bg-primaryAppearance p-[1.5rem]'>
//                         <AddNewContactSvgIcon color='white' />
//                         <span className='text-[18px] text-white'>{t('contact.contactForm.buttonLabel')}</span>
//                     </button>
//                     {/* <Button type='submit' className='bg-primaryAppearance p-[1.5rem]'>
//                         <AddNewContactSvgIcon />
//                         <span className='text-[18px] text-white'>{t('contact.contactForm.buttonLabel')}</span>
//                     </Button> */}
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default CompleteContactForm;
