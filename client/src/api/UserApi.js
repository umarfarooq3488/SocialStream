import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const registerUser = async (formData) => {
    try {
        const user = await axios.post(`${API_URL}/users/register`, formData);
        return user.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Something went wrong");
        } else {
            throw new Error("Network error");
        }
    }
};
export const loginUser = async (formData) => {
    try {
        const user = await axios.post(`${API_URL}/users/login`, formData);
        return user.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Something went wrong");
        } else {
            throw new Error("Network error");
        }
    }
};
export const channelDetails = async (userName) => {
    try {
        // Get access token from localStorage
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.accessToken : null;

        const response = await axios.get(`${API_URL}/users/channel/${userName}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Failed to fetch channel details');
        }
    }
};
export const UpdateChannelDetails = async (formData) => {
    try {
        // Get access token from localStorage
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.accessToken : null;

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.patch(
            `${API_URL}/users/update`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Failed to update profile details');
        }
    }
};
export const addToHistory = async (videoId) => {
    try {
        // Get access token from localStorage
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.accessToken : null;

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.patch(
            `${API_URL}/users/add-to-history/${videoId}`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Failed to update profile details');
        }
    }
};
export const getHistory = async () => {
    try {
        // Get access token from localStorage
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.accessToken : null;

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.get(
            `${API_URL}/users/history`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Failed to update profile details');
        }
    }
};
