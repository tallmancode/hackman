<script setup lang="ts">
const router = useRouter();
definePageMeta({
    path: '/',
    public: true
})

</script>

<template>
<div class="h-full w-full bg-dark-800/70 text-white">
    <div class="flex flex-col w-full h-full items-center justify-center max-w-[350px] mx-auto">
        <h1 class="uppercase text-2xl font-bold">Welcome to</h1>
        <h1 class="uppercase text-5xl font-bold">hackman</h1>
        <div class="mt-4 flex space-x-4 w-full">
            <UButton label="Login" size="lg" class="w-full justify-center" @click="() => {
                router.push('/login')
            }"></UButton>
            <UButton label="Register" size="lg" class="w-full justify-center"  @click="() => {
                router.push('/register')
            }"></UButton>
        </div>
    </div>
</div>
</template>

<style scoped>
</style>