<script setup lang="ts">
// import {loginUser, registerUser} from "~/composables/useAuth";
import {setCookies} from "~/composables/useAuth";
import type {AxiosError} from "axios";
import UseFormError from "~/composables/UseFormError";

const { $api } = useNuxtApp();
const router = useRouter()
definePageMeta({
    path: "/login",
    public: true
})

const errors = ref()
const loading = ref(false)
// const {loading, login, errors} = loginUser()
const formData = ref({
    username: '',
    password: ''
})

const handleSubmit = async () => {
    loading.value = true
    try {
        const resp = await $api.auth.login(formData.value);
        if (resp.status === 200 ) {
            setCookies(resp.data.token, resp.data.refresh_token).then(() => {
                router.push("/");
            })

        }
    } catch (err: AxiosError) {
        if (err.response && err.response.status === 422) {
            errors.value = UseFormError(err.response.data);
        }
    }
    loading.value = false
}
</script>

<template>
    <div class="flex h-full w-full items-center justify-center relative">
        <form @submit.prevent="handleSubmit()" class="flex flex-col space-y-2 relative z-10 min-w-[350px]">
            <div class="flex justify-center">
                <NuxtImg src="/assets/digital_dungeon_logo.png" class="max-w-[150px]"/>
            </div>
            <UDivider label="Log in"
                      :ui="{ label: 'text-xl text-dark-800 dark:text-light-100', border: {base: 'dark:border-light-100'} }"
                      class="mb-4 select-none"/>
            <UFormGroup label="Email" name="email" :error="errors ? 'Incorrect Email or Password' : false">
                <UInput v-model="formData.username" type="email"/>
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput v-model="formData.password" type="password"/>
            </UFormGroup>
            <div class="flex justify-between">
                <NuxtLink :to="{name: 'auth-register'}" class="text-sm text-light-100 dark:text-light-100">
                    Don't have an account?
                    <span class="text-primary-300">Register</span>
                </NuxtLink>
                <NuxtLink :to="{name: 'auth-forgot-password'}" class="text-sm text-primary-300">
                    Forgot Password
                </NuxtLink>
            </div>
            <UButton color="primary" size="lg" type="submit"
                     :loading="loading"
                     :ui="{variant: {solid: 'dark:text-light-50 text-light-50'}}"
                     class="w-full justify-center md:w-auto">
                Enter The Dungeon
            </UButton>
        </form>
        <div class="absolute w-full h-full">
            <div class="h-full w-full  overflow-hidden rounded-xl">
                <NuxtImg src="/assets/login-background.jpg" alt=""
                         class="object-center object-cover w-full h-full"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>