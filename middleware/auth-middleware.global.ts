import {getCookies} from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if(to.meta.allow){
        return true
    }
    const {jwtToken, refreshToken} = getCookies()
    if (to.meta.public) {
        if(jwtToken) return navigateTo("/lobby");
    }else if (!to.meta.public){
        if(!jwtToken && !refreshToken) return navigateTo("/", { redirectCode: 421 });
    }
    return true
});
