// utils/axios-instance.ts
import { useNuxtApp } from '#app'
import type {RuntimeConfig} from "nuxt/schema";
import axios from "axios";
import {getCookies, setCookies} from "~/composables/useAuth";

export const customAxios = async ({ url, method, ...config }) => {
    const _publicConfig: RuntimeConfig = useRuntimeConfig();

    const axiosInstance = axios.create({
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        baseURL: _publicConfig.public.baseUrl,
    });

    axiosInstance.interceptors.request.use( (config) => {
        const {jwtToken, refreshToken} = getCookies()
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    });

    axiosInstance.interceptors.response.use(
        response => response, // Directly return successful responses.
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
                try {
                    const {jwtToken, refreshToken} = getCookies() // Retrieve the stored refresh token.

                    const resp = await axios.post(`${_publicConfig.public.baseUrl}api/token/refresh`, {
                        refresh_token: refreshToken,
                    });

                    const { token, refresh_token: newRefreshToken } = resp.data;

                    setCookies(token, newRefreshToken)

                    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest); // Retry the original request with the new access token.
                } catch (refreshError) {
                   setCookies(undefined, undefined)
                   window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error); // For all other errors, return the error as is.
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
