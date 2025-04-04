import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const uploadVideo = async (uploadData, onProgress) => {
    const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.accessToken
        : null;

    const formData = new FormData();
    formData.append('title', uploadData.title);
    formData.append('description', uploadData.description);
    formData.append('duration', uploadData.duration);
    formData.append('thumbnail', uploadData.thumbnail);
    formData.append('videoFile', uploadData.videoFile);

    try {
        const response = await axios.post(
            `${API_URL}/videos/upload`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onProgress?.(percentCompleted);
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const retrieveVideos = async () => {
    try {
        const token = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).data.accessToken
            : null;
        const response = await axios.get(
            `${API_URL}/videos/all-videos`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        );
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getVideoDetails = async (videoId) => {
    if (!videoId) {
        console.log("No video id")
    }
    try {
        const token = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).data.accessToken
            : null;

        const response = await axios.get(`${API_URL}/videos/details/${videoId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};