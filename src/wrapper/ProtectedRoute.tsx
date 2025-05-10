import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

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
        return <div>Loading...</div>; // Or your loading component
    }

    if (error || !userNow) {
        return null;
    }

    return <>{children}</>;
}