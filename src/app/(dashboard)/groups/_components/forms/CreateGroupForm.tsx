import React from 'react';

import { useRouter } from 'next/navigation';
import {
  Controller,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { FormButton } from '@/app/_components/form/FormButton';
import { FormInput } from '@/app/_components/form/FormInput';
import { notify } from '@/components/utilities/helper';
import useGetLocalStorage from '@/hooks/useGetLocalStorage';
import { useGroups } from '@/hooks/useGroupOps';
import { CreateGroupType } from '@/types/groups';
import { zodResolver } from '@hookform/resolvers/zod';

const groupSchema = z.object({
    name: z.string().min(1, 'Group name is required'),
    code: z.string().min(1, 'Group code is required'),
});

type GroupFormData = z.infer<typeof groupSchema>;

interface CreateGroupFormProps {
    onClose?: () => void;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onClose }) => {
    const { createGroup } = useGroups();
    const { getLocalStorage } = useGetLocalStorage();
    const user = getLocalStorage("user");
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<GroupFormData>({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            name: '',
            code: ''
        }
    });

    const onSubmit = async (data: GroupFormData) => {
        try {
            const groupData: CreateGroupType = {
                ...data,
                enterpriseId: user?.enterprise?.id
            };

            const response = await createGroup(groupData);
            console.log('Group created:', response);
            notify.success('Group created successfully');
            router.push(`/groups/${response.id}`);
            onClose?.();
        } catch (error) {
            notify.error('Failed to create group');
            console.error('Error creating group:', error);
        }
    };

    return (
        <div className='max-h-[500px] overflow-y-auto p-2'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-3">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            label="Group Name"
                            placeholder="Enter group name"
                            className="border-primaryAppearance"
                            error={errors.name?.message}
                        />
                    )}
                />

                <Controller
                    name="code"
                    control={control}
                    render={({ field }) => (
                        <FormInput 
                            {...field}
                            label="Group Code"
                            placeholder="Enter group code"
                            className="border-primaryAppearance"
                            error={errors.code?.message}
                        />
                    )}
                />

                <div className='flex flex-col gap-4'>
                    <FormButton 
                        className='bg-primaryAppearance h-[56px] text-white' 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Group"}
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

export default CreateGroupForm;