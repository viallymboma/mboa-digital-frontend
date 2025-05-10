import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ApiService } from '@/services/data.service';

export function useTokenExpiration() {
    const router = useRouter();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            // Check if token is expired (you'll need to decode the JWT)
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = decodedToken.exp * 1000;

            if (Date.now() >= expirationTime - 60000) { // 1 minute before expiration
                const apiService = ApiService.getInstance();
                apiService.handleTokenRefresh().catch(() => {
                    router.push('/login');
                });
            }
        };

        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [router]);
}