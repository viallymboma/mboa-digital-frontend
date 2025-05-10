"use client";
import React from 'react';

import { useTokenExpiration } from '@/hooks/useTokenExpiration';
import { ProtectedRoute } from '@/wrapper/ProtectedRoute';

import DashboardLayout from './dashboard/DashboardLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
    // Add the hook here
    useTokenExpiration ();
    return (
        <ProtectedRoute >
            <DashboardLayout>
                { children }
            </DashboardLayout>
        </ProtectedRoute>
    )
}

export default Layout