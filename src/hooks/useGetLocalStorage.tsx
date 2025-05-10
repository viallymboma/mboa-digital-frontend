// Description: This hook retrieves a value from local storage by its key.

const useGetLocalStorage = () => {
    const getLocalStorage = (key: string) => {
        if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : null
        }
        return null
    }
    return {
        getLocalStorage
    }
}

export default useGetLocalStorage