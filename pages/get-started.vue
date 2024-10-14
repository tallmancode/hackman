<script setup lang="ts">
import api from "~/utils/api/api";
import {useUser} from "~/store/user";
import {useWords} from "~/store/words";

const state = ref({
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    office: undefined
})

onMounted(() => {
    getWords()
})


const wordsStore = useWords();
const officeOptions = [
    {
        name: 'Osiris',
        value: 'osiris'
    },
    {
        name: 'Call center',
        value: 'call-center'
    },
    {
        name: 'Raging River',
        value: 'raging-river'
    }
]

const submitLoading = ref(false)
const userStore = useUser();
const router = useRouter();
const handleSubmit = () => {
    submitLoading.value = true
    api({
        url: '/api/play',
        options: {
            method: 'POST'
        },
        data: state.value
    }).then((resp) => {
        userStore.user = resp
        router.push('/hackman')
        })
        .catch((error) => {

        })
        .finally(() => {
            submitLoading.value = false
        })
}

const getWords = () => {
    api({
        url: '/api/words',
            options: {
            method: 'GET'
        },
    }).then((resp) => {
        wordsStore.words = resp
    })
        .catch((error) => {

        })
        .finally(() => {
        })
}


</script>

<template>
    <div class="h-full w-full bg-neutral-800/70 text-white ">

        <div class="flex container w-full mx-auto h-full items-center">
            <div class="w-full flex flex-col items-center justify-center">
                <div class="max-w-[400px]">
                    <h1 class="text-center text-xl font-bold mb-8">Your mission should you choose to accept, is to hack
                        the passwords as quickly as possible.</h1>
                    <UDivider label="Hot To Play" :ui="{container: {base: 'text-white'}}"/>
                    <div class="mt-4 text-light-300">
                        <ul class="list-disc">
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
                                will loose a life.
                            </li>
                            <li class="mb-2">
                                Once you have lost all 3 lives you will not be able to attempt the hack again.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-col items-center justify-center">
                <h1 class="uppercase text-2xl mb-4">Enter You Details</h1>
                <UForm :state="state" class="space-y-4 text-white max-w-[400px] w-full" @submit="handleSubmit">
                    <UFormGroup label="First Name" name="first-name" class="text-white"
                                :ui="{label: {base: 'text-white'}}">
                        <UInput v-model="state.firstName" color="light" variant="outline"
                                :ui="{variant:{outline: 'text-white'}}"/>
                    </UFormGroup>
                    <UFormGroup label="Last Name" name="last-name" :ui="{label: {base: 'text-white'}}">
                        <UInput v-model="state.lastName" variant="outline" color="light"
                                :ui="{variant:{outline: 'text-white'}}"/>
                    </UFormGroup>
                    <UFormGroup label="Email" name="email" :ui="{label: {base: 'text-white'}}">
                        <UInput v-model="state.email" type="email" variant="outline" color="light"
                                :ui="{variant:{outline: 'text-white'}}"/>
                    </UFormGroup>
                    <UFormGroup label="Select Office" :ui="{label: {base: 'text-white'}}">
                        <USelectMenu v-model="state.office" option-attribute="name" :options="officeOptions"
                                     variant="outline" color="light" placeholder="-- Select --"
                                     :ui="{variant:{outline: 'text-white'}}"/>
                    </UFormGroup>
                    <UButton label="Get Hacking" size="lg" type="submit" :loading="submitLoading"></UButton>
                </UForm>
            </div>
        </div>

    </div>
</template>

<style scoped>

</style>