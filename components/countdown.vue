<script setup lang="ts">
import api from "~/utils/api/api";
import {useUser} from "~/store/user";

const time = ref(3)
const timer = ref()
const router = useRouter()
const userStore = useUser();

const emit = defineEmits<{
    (
        event: 'startGame', value: undefined
    ): void
}>()

onMounted(() => {
    timer.value = setInterval(countdown, 1000);
})

const countdown = () => {
    time.value = time.value - 1
    if (time.value === 0) {
        clearInterval(timer.value)
        handleBegin()
    }
}

const startNewGame = () => {
    clearInterval(timer.value)
    time.value = 4
    timer.value = setInterval(countdown, 1000);
    countdown();
}

defineExpose({startNewGame})


const handleBegin = () => {
    if(!userStore.user) return
    api({
        url: '/api/start',
        options: {
            method: 'POST'
        },
        data: {
            email: userStore.user.email
        }
    }).then((resp) => {
        userStore.level = resp.level
        userStore.lives = resp.lives
        userStore.gameId = resp.gameId
        userStore.gameStart = resp.start
        emit('startGame',resp.start )
    })
        .catch((error) => {
            showError({statusCode: 500, statusMessage: 'Error'})
        })
        .finally(() => {
        })
}
</script>

<template>
    <div class="flex flex-col items-center justify-center h-dvh w-full text-white">
        <div class="h-[500px] w-[500px] rounded-full bg-neutral-800/80 flex flex-col items-center justify-center">
            <h1 class="text-5xl">Ready Player One</h1>
            <div class="text-9xl">
                {{ time }}
            </div>
        </div>
    </div>


</template>

<style scoped>


</style>z