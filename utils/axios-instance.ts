import axios from "axios";
import {getCookies, setCookies} from "~/composables/useAuth";

export const customAxios = async ({url, method, ...config}) => {
    const axiosInstance = axios.create({
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        baseURL: '',
    });

    axiosInstance.interceptors.request.use((config) => {
        const {jwtToken} = getCookies()
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    });

    axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== "/api/login") {
                originalRequest._retry = true;
                try {
                    const {refreshToken} = getCookies()

                    const resp = await axios.post('/api/token/refresh', {
                        refresh_token: refreshToken,
                    });

                    const {token, refresh_token: newRefreshToken} = resp.data;

                    setCookies(token, newRefreshToken)

                    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    setCookies(undefined, undefined)
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    const response = await axiosInstance.request({
        url,
        method,
        ...config,
    })

    // Unwrap hydra:member for collections
    if (response?.data?.['hydra:member']) {
        return {
            items: response.data['hydra:member'],
            total: response.data['hydra:totalItems'] ?? response.data['hydra:member']?.length,
            raw: response.data,
        }
    }

    return response.data
}
