import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const registerUser = async (formData) => {
    try {
        const user = await axios.post(`${API_URL}/users/register`, formData);
        return user.data;
    } catch (error) {
        if (error.response && error.response.data) {
            // Throw the error response data from the backend
            console.log(error.response.data)
            throw new Error(error.response.data.message || "Something went wrong");
        } else {
            throw new Error("Network error");
        }
    }
};