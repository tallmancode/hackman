<script setup lang="ts">
import api from "~/utils/api/api";
import {useUser} from "~/store/user";
import {useWords} from "~/store/words";
import useVuelidate from "@vuelidate/core";
import {helpers, required, email} from "@vuelidate/validators";

const config = useRuntimeConfig().public

const state = ref({
    email: '',
    firstName: undefined,
    lastName: undefined,
    office: undefined
})

// onMounted(() => {
//     getWords()
// })

const form = useVuelidate({
    email: {
        required, email
    },
    firstName: {
        required
    },
    lastName: {
        required
    },
    office: {
        required
    }
}, state)




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
const formError = ref(false)
const handleSubmit = () => {
    submitLoading.value = true
    form.value.$validate();
    formError.value = false
    if(form.value.$error){
        submitLoading.value = false
        return
    }
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
            formError.value = 'An error has occured. Please try again.'
        })
        .finally(() => {
            submitLoading.value = false
        })
}

// const getWords = () => {
//     api({
//         url: '/api/words',
//             options: {
//             method: 'GET'
//         },
//     }).then((resp) => {
//         wordsStore.words = resp
//     }).catch(() => {
//         showError({statusCode: 500, statusMessage: 'Page Not Found'})
//     })
// }


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
            <div class="w-full flex flex-col items-center justify-center" v-if="config.finished">
                <h1 class="text-4xl mb-4">Hackman Is Finished</h1>
                <div class="flex justify-center">
                    <UButton label="Leaderboard" size="lg" type="button"  @click="router.push('/leaders')" ></UButton>
                </div>
            </div>
            <div class="w-full flex flex-col items-center justify-center" v-else>
                <h1 class="uppercase text-2xl mb-4">Enter You Details</h1>
                <UForm ref="formElem" :state="state" class="space-y-4 text-white max-w-[400px] w-full" @submit="handleSubmit">
                    <UAlert
                        v-if="formError"
                        color="primary"
                        variant="solid"
                        :title="formError"
                    />
                    <UFormGroup label="First Name" name="first-name" class="text-white" :error="form.firstName.$errors[0]?.$message"
                                :ui="{label: {base: 'text-white'}}">
                        <UInput v-model="state.firstName" color="light" variant="outline" @blur="form.firstName.$validate()"
                                :ui="{variant:{outline: 'text-white'}}" :disabled="config.finished"/>
                    </UFormGroup>
                    <UFormGroup label="Last Name" name="last-name" :ui="{label: {base: 'text-white'}}" :error="form.lastName.$errors[0]?.$message">
                        <UInput v-model="state.lastName" variant="outline" color="light"
                                :ui="{variant:{outline: 'text-white'}}" :disabled="config.finished"/>
                    </UFormGroup>
                    <UFormGroup label="Email" name="email" :ui="{label: {base: 'text-white'}}" :error="form.email.$errors[0]?.$message">
                        <UInput v-model="state.email" type="email" variant="outline" color="light" e
                                :ui="{variant:{outline: 'text-white'}}" :disabled="config.finished"/>
                    </UFormGroup>
                    <UFormGroup label="Select Office" :ui="{label: {base: 'text-white'}}" :error="form.office.$errors[0]?.$message">
                        <USelectMenu v-model="state.office" option-attribute="name" :options="officeOptions"
                                     variant="outline" color="light" placeholder="-- Select --"
                                     :ui="{variant:{outline: 'text-white'}}" :disabled="config.finished"/>
                    </UFormGroup>
                    <div class="text-xs">* Only valid Raging River and Osiris Trading emails will be considered for prizes.</div>
                    <div class="flex justify-between">
                        <UButton label="Get Hacking" size="lg" type="submit" :loading="submitLoading" :disabled="config.finished"></UButton>
                        <UButton label="Leaderboard" size="lg" type="button"  @click="router.push('/leaders')" ></UButton>
                    </div>
                </UForm>
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>