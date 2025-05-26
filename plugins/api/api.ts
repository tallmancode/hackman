import axios from "axios";
import type {RuntimeConfig} from "nuxt/schema";
import AuthModule from "~/plugins/api/modules/AuthModule";
import {getCookies} from "~/composables/useAuth";
import GameModule from "~/plugins/api/modules/GameModule";

export default defineNuxtPlugin(() => {
    const _publicConfig: RuntimeConfig = useRuntimeConfig();

    const axiosInstance = axios.create({
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        baseURL: _publicConfig.public.api.baseURL,
    });

    axiosInstance.interceptors.request.use(function (config) {
        const {jwtToken, refreshToken} = getCookies()
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }else{
            const router = useRouter()
            router.push("/login");
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    });

    const api = {
        auth: new AuthModule(axiosInstance),
        game: new GameModule(axiosInstance)
    };

    return {
        provide: {
            api,
        },
    };
});
