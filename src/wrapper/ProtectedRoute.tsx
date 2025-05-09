import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useAuth.hook';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const { user, isLoading, error } = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        return <div>Loading...</div>; // Or your loading component
    }

    if (error || !user) {
        return null;
    }

    return <>{children}</>;
}