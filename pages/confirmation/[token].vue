<script setup lang="ts">
import {customAxios} from "~/utils/axios-instance";

const token = useRoute().params.token
const hasError = ref(false)

definePageMeta({
    public: true
})

const router = useRouter();

onMounted(() =>{
    customAxios(
        {url: `/api/confirmation/${token}`, method: 'POST'
        },
    ).then((resp) => {
        const jwtToken = useCookie('jwtToken', {
            maxAge: 3600, // Set the cookie to expire in 3600 seconds (1 hour)
        }); // Coo

        const refreshToken = useCookie('refreshToken', {
            maxAge: 604800, // Set the cookie to expire in 3600 seconds (1 hour)
        });

        jwtToken.value = resp.token;
        refreshToken.value = resp.refresh_token;// Cookie for JWT
        router.push("/lobby");
    }).catch((e) => {
        hasError.value = true
    });
})
</script>

<template>
<div class="h-full w-full flex flex-col justify-center items-center bg-dark-900/60 text-light-50">
    <div class="h-full w-full flex flex-col  justify-center items-center bg-dark-900/60 text-light-50" v-if="!hasError">
        <UIcon name="i-mdi-loading" class="size-12 animate-spin" />
        <div>
            <h1>We are verifying your account!</h1>
        </div>
    </div>
    <div class="h-full w-full flex flex-col  justify-center items-center bg-dark-900/60 " v-if="hasError">
        <div class="text-3xl text-primary">
            <h1>Something has gone wrong!</h1>
        </div>
    </div>
</div>
</template>

<style scoped>

</style>