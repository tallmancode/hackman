<script setup lang="ts">
const router = useRouter();
definePageMeta({
    path: '/',
    public: true
})

const loading = ref(false)

</script>

<template>
<div class="h-full w-full bg-neutral-800/70 text-white">
    <div class="flex flex-col w-full h-full items-center justify-center">
        <h1 class="uppercase text-2xl font-bold">Welcome to</h1>
        <h1 class="uppercase text-5xl font-bold">hackman</h1>
        <div class="mt-4">
            <UButton label="Login" size="lg" :disabled="loading" :loading="loading" @click="() => {
                loading = true
                router.push('/login')
            }"></UButton>
            <UButton label="Register" size="lg" :disabled="loading" :loading="loading" @click="() => {
                loading = true
                router.push('/register')
            }"></UButton>
        </div>
    </div>
</div>
</template>

<style scoped>
</style>