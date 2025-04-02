import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const ToggleSubscribe = async (channelID) => {
    try {
        const Token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.accessToken : null;

        const res = await axios.post(`${API_URL}/subscriptions/toggle-subscribe/${channelID}`, {}, {
            headers: {
                "Authorization": `Bearer ${Token}`
            }
        })
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw error.response.data || error.message;
    }
}