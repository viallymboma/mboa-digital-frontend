"use client";
import React, { useState } from 'react';

import {
  ArrowRight,
  CheckCircle,
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
import { zodResolver } from '@hookform/resolvers/zod';

// ✅ Define validation schema using Zod
const schema = z.object({
  phone: z.string().min(9, { message: "Numéro de téléphone invalide" }),
  smsCount: z.string().min(1, { message: "Nombre de SMS requis" }),
  rechargeType: z.string().min(1, { message: "Type de recharge requis" }),
});

// ✅ Define form data type
type FormData = z.infer<typeof schema>;

const RechargeForm = () => {
  const [step, setStep] = useState(1);
  const [totalPrice] = useState(1500);

  const options = [
    { value: 'hf3894fu8034jfhihfif-2948492', label: 'MTN Momo' },
    { value: 'dbwg62t4r892483714y0r9284903', label: 'Orange Money' },
    { value: 'cnwiurfh98wufu24o98240924yh2', label: 'Vodafone Cash' },
  ];

  // ✅ Initialize react-hook-form with Zod validation
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // ✅ Form Submission
  const onSubmit = (data: FormData) => {
    console.log("Recharge Details:", data);
    setStep(2); // Move to step 2 on success
  };

  const performRechargeAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Recharge completed successfully");
  }

  return (
    <div className="max-h-[500px] overflow-y-auto p-2">
      {/* Title */}
      <h2 className="text-xl font-bold">Faire une recharge</h2>

      {/* Progress Indicator */}
      {/* <Progress value={step === 1 ? 50 : 100} className="mt-3 mb-5 " /> */}
      <div className={`flex flex-row gap-3 items-center`}>
        <Progress value={ step === 1 ? 100 : 0 } className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5 " />
        <Progress value={ step === 1 ? 0 : 100 } className="bg-gray-200 [&>div]:bg-primaryAppearance mt-3 mb-5 " />
      </div>

      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-3xl font-bold text-purple-700 text-center">
            {totalPrice} FCFA
          </div>
          <p className="text-gray-500 text-center mb-4">Prix total</p>

          {/* Phone Input */}
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput 
                  {...field}
                  className='border-primaryAppearance'
                  // label={t('contact.contactForm.fullName')}
                  label=""
                  type="number"
                  placeholder={"Numéro de Téléphone"}
                  error={errors.phone?.message}
              />
            )}
          />
          {/* {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )} */}

          {/* SMS Count Input */}
          <Controller
            name="smsCount"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput 
                  {...field}
                  className='border-primaryAppearance'
                  // label={t('contact.contactForm.fullName')}
                  label=""
                  type="number"
                  placeholder={"Nombres de SMS"}
                  error={errors.smsCount?.message}
              />
            )}
          />
          {/* {errors.smsCount && (
            <p className="text-red-500 text-sm">{errors.smsCount.message}</p>
          )} */}

          {/* Recharge Type Select */}
          <Controller
            name="rechargeType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CountrySelect
                {...field}
                label=""
                className='border-primaryAppearance'
                options={options}
                value={field.value}
                // onChange={field.onChange}
                error={errors.rechargeType?.message} // Include error for country
              />
            )}
          />
          {/* {errors.rechargeType && (
            <p className="text-red-500 text-sm">{errors.rechargeType.message}</p>
          )} */}

          {/* Next Button */}
          <Button type="submit" className="w-full bg-purple-700 text-white">
            Suivant <ArrowRight className="ml-2" />
          </Button>
        </form>
      )}

      {step === 2 && (
        <>
          <div className="text-3xl font-bold text-purple-700 text-center mb-2">
            {totalPrice} FCFA
          </div>
          <p className="text-gray-500 text-center mb-4">Prix total</p>
          <p className="text-center text-black font-medium mb-4">
            Valider la transaction sur votre mobile et cliquer sur terminer la
            transaction
          </p>

          {/* Complete Button */}
          <Button onClick={(e) => performRechargeAction (e)} className="w-full bg-purple-700 text-white">
            Terminer la Transaction <CheckCircle className="ml-2" />
          </Button>

          {/* Back Button */}
          <Button variant="outline" className="w-full mt-3" onClick={() => setStep(1)}>
            Retour
          </Button>
        </>
      )}
    </div>
  );
};

export default RechargeForm;















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
