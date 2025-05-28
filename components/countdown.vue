<script setup lang="ts">

import {useUser} from "~/store/user";

const time = ref(3)
const timer = ref()

const emit = defineEmits<{
    (
        event: 'startGame'
    ): void
}>()

onMounted(() => {
    timer.value = setInterval(countdown, 1000);
})

const countdown = () => {
    time.value = time.value - 1
    if (time.value === 0) {
        clearInterval(timer.value)
        emit('startGame' )
    }
}

const startNewGame = () => {
    clearInterval(timer.value)
    time.value = 4
    timer.value = setInterval(countdown, 1000);
    countdown();
}

defineExpose({startNewGame})

</script>

<template>
    <div class="flex flex-col items-center justify-center h-dvh w-full text-white">
        <div class="relative overflow-hidden h-[calc(100vw-100px)] w-[calc(100vw-100px)] md:h-[500px] md:w-[500px] rounded-full  flex flex-col items-center justify-center bg-cover bg-[url(/public/test-pattern.jpg)]">
            <h1 class="text-2xl md:text-5xl z-10">Ready Hacker</h1>
            <div class="text-9xl z-10">
                {{ time }}
            </div>
            <div class="bg-dark-950/70 absolute top-0 bottom-0 left-0 right-0"></div>
        </div>
    </div>
</template>

<style scoped>


</style>z