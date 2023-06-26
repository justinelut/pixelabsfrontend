"use client"

import { useContext } from 'react';
import { AuthContext } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({children}) {
    return function ProtectedRouteWrapper() {
        const router = useRouter();
        const { user } = useContext(AuthContext);
        console.log(user)

        if (!user || !user.token) {
            // user is not authenticated, redirect to login page
            if (typeof window !== 'undefined') {
                router.push('/')
            }
            return null;
        }

        // user is authenticated, render the wrapped component
        return (
            <>
            {children}
            </>
        );
    };
}
