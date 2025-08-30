"use client";
import React from 'react';

import { useRouter } from 'next/navigation';

import { decodeJwtPayload } from '@/hooks/useTokenExpiration';
import { ProtectedRoute } from '@/wrapper/ProtectedRoute';

import DashboardLayout from './dashboard/DashboardLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
    // Add the hook here
    const router = useRouter();

    const [ isHydrated, setIsHydrated ] = React.useState(false);

    React.useEffect(() => {
        setIsHydrated(true);
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/login');
            return;
        }

        const decodedToken = decodeJwtPayload(token);
        if (!decodedToken || !decodedToken.exp) {
            localStorage.removeItem('token');
            router.replace('/login');
            return;
        }

        const expirationTime = decodedToken.exp * 1000;
        const now = Date.now();
        const timeout = expirationTime - now - 60000; // 1 minute before expiration

        if (timeout <= 0) {
            localStorage.removeItem('token');
            router.replace('/login');
            return;
        }

        const timer = setTimeout(() => {
            localStorage.removeItem('token');
            router.replace('/login');
        }, timeout);

        return () => clearTimeout(timer);
    }, [router]);

    if (!isHydrated) {
        return null; // or a loading spinner
    }
    return (
        <ProtectedRoute >
            <DashboardLayout>
                { children }
            </DashboardLayout>
        </ProtectedRoute>
    )
}

export default Layout