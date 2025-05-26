<script setup lang="ts">
import type { AxiosError } from "axios";
import UseFormError from "~/composables/UseFormError";

//TODO : Validate confirm password, Global Errors
// import {registerUser} from "~/composables/useAuth";

definePageMeta({
    path: "/register",
    public: true
})

const router = useRouter()
const { $api } = useNuxtApp();
const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    characterName: ''
})

const loading = ref(false)

const handleSubmit = async () => {
    loading.value = true
    try {
        const resp = await $api.auth.register(formData.value);
        if (resp.status === 200 ) {
            const jwtToken = useCookie('jwtToken', {
                maxAge: 3600, // Set the cookie to expire in 3600 seconds (1 hour)
            }); // Coo

            const refreshToken = useCookie('refreshToken', {
                maxAge: 604800, // Set the cookie to expire in 3600 seconds (1 hour)
            });

            jwtToken.value = resp.data.token;
            refreshToken.value = resp.data.refresh_token;// Cookie for JWT
            router.push("/");
        }
    } catch (err: AxiosError) {
        if (err.response && err.response.status === 422) {
           errors.value = UseFormError(err.response.data);
        }
    }
    loading.value = false
}

const errors = ref()

</script>

<template>
    <div class="flex h-full w-full items-center justify-center relative">
        <form @submit.prevent="handleSubmit()" class="flex flex-col space-y-2 relative z-10 min-w-[350px]">
            <div class="flex justify-center">
                <NuxtImg src="/assets/digital_dungeon_logo.png" class="max-w-[150px]"/>
            </div>
            <UDivider label="Create Account"
                      :ui="{ label: 'text-xl text-dark-800 dark:text-light-100', border: {base: 'dark:border-light-100'} }"
                      class="mb-4 select-none"/>
            <div v-if="typeof errors === 'object' && errors?.global" class="text-red-600">
                {{ errors?.global }}
            </div>
            <div class="flex space-x-4">
                <UFormGroup label="First Name" name="first-name" class="w-full"
                            :error="typeof errors === 'object' && errors?.firstName">
                    <UInput v-model="formData.firstName" placeholder="Joe" autocomplete="off"/>
                </UFormGroup>
                <UFormGroup label="Last Name" name="last-name" class="w-full"
                            :error="typeof errors === 'object' && errors?.lastName">
                    <UInput v-model="formData.lastName" placeholder="Soap" autocomplete="off"/>
                </UFormGroup>
            </div>
            <UFormGroup label="Character Name" name="character-name" :error="typeof errors === 'object' && errors?.characterName">
                <UInput v-model="formData.characterName" placeholder="Thorne Blackveil"
                        autocomplete="off"/>
            </UFormGroup>
            <UFormGroup label="Email" name="email" :error="typeof errors === 'object' && errors?.email">
                <UInput v-model="formData.email" type="email" placeholder="you@example.com" icon="i-mdi-email-outline"
                        autocomplete="off"/>
            </UFormGroup>

            <UFormGroup label="Password" name="password" :error="typeof errors === 'object' && errors?.password">
                <UInput v-model="formData.password" type="password" autocomplete="off"/>
            </UFormGroup>

            <div class="flex justify-between">
                <NuxtLink :to="{name: 'auth-login'}" class="text-sm text-primary-500">Already registered? Log in
                </NuxtLink>
            </div>
            <UButton color="primary" size="lg" type="submit"
                     :loading="loading"
                     :ui="{variant: {solid: 'dark:text-light-50 text-light-50'}}"
                     class="w-full justify-center md:w-auto">
                Register
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