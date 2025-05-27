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
    errors.value = false
    try {
        const resp = await api.loginCheckPost(formData.value);
        if (resp?.token) {
            setCookies(resp.token, resp.refresh_token).then(() => {
                router.push("/lobby");
            })

        }
    } catch (err) {
        if (err.response) {
            errors.value = true
            //errors.value = UseFormError(err.response.data);
        }
    }
    loading.value = false
}

const show = ref(false)
</script>

<template>
    <div class="flex flex-col h-full w-full items-center justify-center relative bg-dark-900/60 text-light-50">
        <div>
            <NuxtImg src="/logo.png"></NuxtImg>
        </div>
        <form @submit.prevent="handleSubmit()" class="flex flex-col space-y-2 relative z-10 min-w-[350px] ">
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
                <NuxtLink :to="{name: 'auth-register'}" class="text-md text-light-100 dark:text-light-100">
                    Don't have an account?
                    <span class="text-primary-300">Register</span>
                </NuxtLink>
            </div>
            <UButton color="primary" size="lg" type="submit"
                     :loading="loading"
                     class="w-full justify-center md:w-auto">
                Get Hacking
            </UButton>
        </form>
    </div>
</template>

<style scoped>

</style>