import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from "@/lib/authToken.ts";
import { refreshAccessToken } from "@/api/auth.ts";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// attach token on refresh
api.interceptors.request.use((config) => {
    const token = getStoredAccessToken();

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// refresh token after expire
api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;

    if(error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")) {
        originalRequest._retry = true;

        try {
            const { accessToken: newToken } = await refreshAccessToken();
            setStoredAccessToken(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        } catch(error) {
            console.error("Refresh token failed", error);
        }
    } else {
        return Promise.reject(error);
    }
});

export default api;
