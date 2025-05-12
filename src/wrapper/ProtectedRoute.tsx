import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { SvgLogoIcon } from '@/app/svg_components/SvgIcons';
import { useUser } from '@/hooks/useAuth.hook';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const { userNow, isLoading, error } = useUser();

    console.log('ProtectedRoute user:', userNow);

    useEffect(() => {
        if (!isLoading && !userNow) {
            router.push('/login');
        }
    }, [isLoading, userNow, router]);

    if (isLoading) {
        return (<div className='relative flex items-center justify-center w-full h-screen'>
            <div className="absolute  m-auto w-[10rem] h-[10rem] animate-spin p-4 rounded-full  border-t-[10px]  border-t-purple-600 border-primaryAppearanceLight">
            </div>
            <div className='flex items-center justify-center w-[10rem] h-[10rem] rounded-full'>
                <SvgLogoIcon height='98' width='100' />
            </div>
        </div>); // Or your loading component
    }

    if (error || !userNow) {
        return null;
    }

    return <>{children}</>;
    

}