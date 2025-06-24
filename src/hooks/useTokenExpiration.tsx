import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

function decodeJwtPayload(token: string) {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) throw new Error('Invalid token format');
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
        const jsonPayload = decodeURIComponent(
            atob(padded)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
    }
}

export function useTokenExpiration() {
    const router = useRouter();

    useEffect(() => {
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
}












// import { useEffect } from 'react';

// import { useRouter } from 'next/navigation';

// import { ApiService } from '@/services/data.service';

// function decodeJwtPayload(token: string) {
//     try {
//         const base64Url = token.split('.')[1];
//         if (!base64Url) throw new Error('Invalid token format');
//         // Convert base64url to base64
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         // Pad with '=' if necessary
//         const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
//         const jsonPayload = decodeURIComponent(
//             atob(padded)
//                 .split('')
//                 .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//                 .join('')
//         );
//         return JSON.parse(jsonPayload);
//     } catch (error) {
//         console.error('Failed to decode JWT:', error);
//         return null;
//     }
// }

// export function useTokenExpiration() {
//     const router = useRouter();

//     // useEffect(() => {
//     //     const checkTokenExpiration = () => {
//     //         const token = localStorage.getItem('token');
//     //         if (!token) return;

//     //         // Check if token is expired (you'll need to decode the JWT)
//     //         const decodedToken = JSON.parse(atob(token.split('.')[1]));
//     //         const expirationTime = decodedToken.exp * 1000;

//     //         if (Date.now() >= expirationTime - 60000) { // 1 minute before expiration
//     //             const apiService = ApiService.getInstance();
//     //             apiService.handleTokenRefresh().catch(() => {
//     //                 router.push('/login');
//     //             });
//     //         }
//     //     };

//     //     checkTokenExpiration();
//     //     const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

//     //     return () => clearInterval(interval);
//     // }, [router]);
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const decodedToken = decodeJwtPayload(token);
//         if (!decodedToken || !decodedToken.exp) {
//             return;
//         }

//         const expirationTime = decodedToken.exp * 1000;
//         const now = Date.now();
//         const timeout = expirationTime - now - 60000; // 1 minute before expiration

//         if (timeout <= 0) {
//             return;
//         }

//         const timer = setTimeout(() => {
//         }, timeout);

//         return () => clearTimeout(timer);
//     }, [ token ]);
// }