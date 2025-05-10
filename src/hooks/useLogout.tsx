// import { ApiService } from "@/services/data.service";
import { useRouter } from 'next/navigation';

export function useLogout() {
    const router = useRouter();

    const logout = async () => {
        try {
            // Clear all auth-related items from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            
            // // Optional: Call logout endpoint if your API requires it
            // const apiService = ApiService.getInstance();
            // await apiService.post('/api/v1/auth/logout');
            
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear storage and redirect, even if API call fails
            localStorage.clear();
            router.push('/login');
        }
    };

    return { logout };
}