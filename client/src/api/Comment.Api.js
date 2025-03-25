import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const createComment = async (data, videoId) => {
    try {
        const token = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).data.accessToken
            : null;

        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.post(
            `${API_URL}/comments/create/${videoId}`, // Removed the leading slash
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export const retrieveComments = async (videoId) => {
    try {
        const token = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).data.accessToken
            : null;

        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.get(
            `${API_URL}/comments/all/${videoId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}