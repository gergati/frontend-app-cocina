import { apiClient } from "./apiClient"




export const login = async (email, password) => {
    try {
        const response = await apiClient.post('users/login', { email, password })
        return response.data
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const register = async (name, email, password) => {
    try {
        const response = await apiClient.post('/users/register', { name, email, password })
        return response.data
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const reNewToken = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get('users/renew', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        console.error('Error renew token:', error);
        throw error;
    }
}
