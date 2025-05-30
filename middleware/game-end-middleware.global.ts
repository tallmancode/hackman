import type {RuntimeConfig} from "nuxt/schema";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if(to.name === 'leaders'){
        return true
    }
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', timeStyle: "short", dateStyle: 'short' });
    const date = formatter.format(now)
    const publicConfig : RuntimeConfig = useRuntimeConfig();
    if(Date.parse(publicConfig.public.endtime) <= Date.parse(date)){
        return navigateTo("/leaders", { redirectCode: 301 })
    }
    return true
});