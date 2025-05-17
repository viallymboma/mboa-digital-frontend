// Description: This hook retrieves a value from local storage by its key.

export default function useGetLocalStorage() {
    const getLocalStorage = (key: string) => {
        if (typeof window === 'undefined') return null;
        
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error reading ${key} from localStorage:`, error);
            return null;
        }
    };

    return { getLocalStorage };
}