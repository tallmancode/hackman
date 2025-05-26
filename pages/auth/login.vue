<script setup lang="ts">
// import {loginUser, registerUser} from "~/composables/useAuth";
import {setCookies} from "~/composables/useAuth";
import type {AxiosError} from "axios";
import UseFormError from "~/composables/UseFormError";
import {getHackmanApi} from "~/api-client";
const api = getHackmanApi()
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
        const resp = await api.loginCheckPost(formData.value);
        if (resp?.token) {
            setCookies(resp.token, resp.refresh_token).then(() => {
                router.push("/lobby");
            })

        }
    } catch (err) {
        if (err.response && err.response.status === 422) {
            errors.value = UseFormError(err.response.data);
        }
    }
    loading.value = false
}

const show = ref(false)
</script>

<template>
    <div class="flex h-full w-full items-center justify-center relative">
        <form @submit.prevent="handleSubmit()" class="flex flex-col space-y-2 relative z-10 min-w-[350px]">
            <USeparator label="Log in"
                      :ui="{ label: 'text-xl text-dark-800 dark:text-light-100', border: {base: 'dark:border-light-100'} }"
                      class="mb-4 select-none"/>
            <UFormField label="Email" name="email" :error="errors ? 'Incorrect Email or Password' : false" class="w-full">
                <UInput v-model="formData.username" type="email" class="w-full"/>
            </UFormField>

            <UFormField label="Password" name="password" class="w-full">
                <UInput v-model="formData.password" :type="show ? 'text' : 'password'"
                        :ui="{ trailing: 'pe-1' }" class="w-full">
                    <template #trailing>
                        <UButton
                            color="neutral"
                            variant="link"
                            size="sm"
                            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                            :aria-label="show ? 'Hide password' : 'Show password'"
                            :aria-pressed="show"
                            aria-controls="password"
                            @click="show = !show"
                        />
                    </template>
                </UInput>
            </UFormField>
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
                Get Hacking
            </UButton>
        </form>
    </div>
</template>

<style scoped>

</style>