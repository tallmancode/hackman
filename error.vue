<script setup lang="ts">
const props = defineProps<{error: any}>()
const router = useRouter()
</script>

<template>
    <div class="h-dvh w-full overflow-hidden relative">
        <img src="/error.webp"
             class="object-cover object-center w-full h-full"
            alt="">
        <div class="absolute top-0 bottom-0 text-light-50 w-full flex items-center justify-center bg-neutral-800/60">
            <div class="text-center">
                <h1 class="text-[5rem] mb-0">500</h1>
                <h2 class="mb-4">Something went wrong...</h2>
                <UButton label="Try Again" size="lg" @click="() => {
                    clearError({redirect: '/'})
                } "></UButton>
                <nuxt-link to="/"></nuxt-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
