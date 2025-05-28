<script setup lang="ts">
import type { AxiosError } from "axios";
import {getHackmanApi} from "~/api-client";
import UseFormError from "~/composables/UseFormError";

const api = getHackmanApi()
const userCreate = ref(false)
definePageMeta({
    path: "/register",
    public: true
})


const loading = ref(false)
const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    answer: ''
})


const handleSubmit = async () => {
    loading.value = true
    try {
        const resp = await api.registerUser(formData.value)
        if (resp) {
            userCreate.value = true
        }
    } catch (err: AxiosError) {
        if (err.response && err.response.status === 422) {
            errors.value = UseFormError(err.response.data);
        }
    }
    loading.value = false
}

const errors = ref()
const show = ref(false)
</script>

<template>
    <div class="md:h-full w-full flex flex-col justify-center  text-light-50">
        <div class="w-full flex items-center justify-center">
            <NuxtImg src="/logo.png"></NuxtImg>
        </div>
        <div class="flex-col md:flex-row flex container w-full mx-auto items-center">
            <div class="w-full flex flex-col items-center justify-center">
                <div class="max-w-[400px]">
                    <h1 class="text-center text-xl font-bold mb-8">Operation Firewall: Crack the Code</h1>
                    <USeparator label="How To Play" />
                    <div class="mt-4 text-light-300">
                        <ul class="list-disc">
                            <li class="mb-2">
                                You only have 3 chances to attempt the hack.
                            </li>
                            <li class="mb-2">
                                You will have 3 passwords to hack.
                            </li>
                            <li class="mb-2">
                                Each password will increase in difficulty
                            </li>
                            <li class="mb-2">
                                You will have 3 lives to attempt cracking the passwords.
                            </li>
                            <li class="mb-2">
                                You will need to attempt the hack in a single session! If you refresh your browser you
                                will loose a chance.
                            </li>
                            <li class="mb-2">
                                Once you have used all 3 chances you will not be able to attempt the hack again.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex flex-col h-full w-full items-center justify-center relative" v-if="!userCreate">
                <h1 class="uppercase text-2xl mb-4">Create A Account</h1>
                <form @submit.prevent="handleSubmit()" class="flex flex-col space-y-2 relative z-10 min-w-[350px]">
                    <div class="flex space-x-4">
                        <UFormField label="First Name" name="first-name" class="w-full"
                                    :error="typeof errors === 'object' && errors?.firstName">
                            <UInput v-model="formData.firstName" placeholder="Joe" autocomplete="off" class="w-full"/>
                        </UFormField>
                        <UFormField label="Last Name" name="last-name" class="w-full"
                                    :error="typeof errors === 'object' && errors?.lastName">
                            <UInput v-model="formData.lastName" placeholder="Soap" autocomplete="off" class="w-full"/>
                        </UFormField>
                    </div>
                    <UFormField label="Email" name="email" :error="typeof errors === 'object' && errors?.email"
                                class="w-full">
                        <UInput v-model="formData.email" type="email" placeholder="you@example.com"
                                icon="i-mdi-email-outline"
                                class="w-full"
                                autocomplete="off"/>
                    </UFormField>

                    <UFormField label="Password" name="password" class="w-full" :error="typeof errors === 'object' && errors?.password">
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
                    <p class="max-w-[350px] text-center">According to the updated password policy, what is the minimum length a password must be?</p>
                    <UFormField name="answer" :error="typeof errors === 'object' && errors?.answer"
                                class="w-full">
                        <UInput v-model="formData.answer" type="number"
                                class="w-full"
                                placeholder="Answer"
                                autocomplete="off"/>
                    </UFormField>
                    <div class="flex justify-between mt-4">
                        <UButton label="Register" size="lg" type="submit" :loading="loading" :disabled="loading"></UButton>
                        <UButton label="Login" size="lg" type="button" to="/login" :disabled="loading"></UButton>
                    </div>
                </form>
            </div>
            <div class="flex flex-col h-full w-full items-center justify-center relative" v-else>
                <h1 class="uppercase text-2xl mb-4">Account Created Successfully</h1>
                <p>Please check your email to verify your account</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>