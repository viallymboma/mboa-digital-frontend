"use client";
import React from 'react';

// import { ProtectedRoute } from '@/wrapper/ProtectedRoute';
import DashboardLayout from './dashboard/DashboardLayout';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        // <ProtectedRoute >
        // </ProtectedRoute>
            <DashboardLayout>
                { children }
            </DashboardLayout>
    )
}

export default layout