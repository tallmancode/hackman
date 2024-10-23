<script setup lang="ts">

import WordContainer from "~/components/WordContainer.vue";
import {useUser} from "~/store/user";
import Countdown from "~/components/countdown.vue";
import {useWords} from "~/store/words";
import api from "~/utils/api/api";

const router = useRouter();
const userStore = useUser();
const wordsStore = useWords();
const gameStarted = ref()
const currentWord = ref()
const usedCharacters = ref([])


onMounted(() => {
    if (!userStore.user) {
        router.push('/get-started')
    }
    const word = wordsStore.getWordForLevel(userStore.level)
    currentWord.value = word
})

const stickman = ref()
const guessesLeft = ref(10);
const correct = ref(0)
const showComplete = ref(false)
const countdownTimer = ref()


const handlePick = (char) => {
    usedCharacters.value.push(char)
    if (currentWord.value.word.indexOf(char) === -1) {
        guessesLeft.value -= 1
        stickman.value.animate(guessesLeft.value)
        if (guessesLeft.value === 0) {
            handleLooseLife()
        }
    } else {
        for (let i = 0; i < currentWord.value.word.length; i++) {
            if (currentWord.value.word.charAt(i) === char) {
                correct.value += 1
            }
        }
        if (currentWord.value.word.length === correct.value) {
            handleWin()
        }

        console.log(correct.value, currentWord.value.word.length)
    }
}


const handleWin = () => {
    if (userStore.level === 3) {
        endGame()
    } else {
        userStore.level += 1
        guessesLeft.value = 10
        stickman.value.reset()
        correct.value = 0
        usedCharacters.value = []
        currentWord.value = wordsStore.getWordForLevel(userStore.level)
        console.log(currentWord.value)
        levelUp()

    }

}

const endGame = () => {
    api({
        url: '/api/game-ended',
        options: {
            method: 'POST'
        },
        data: {
            gameId: userStore.gameId,
            lives: userStore.lives,
            level: userStore.level
        }
    }).then((resp) => {
        if(userStore.level === 3 && userStore.lives > 0){
            showComplete.value = true
        }
    })
}

const levelUp = () => {
    api({
        url: '/api/level-up',
        options: {
            method: 'POST'
        },
        data: {
            gameId: userStore.gameId,
            level: userStore.level
        }
    })
}

const showLifeLost = ref(false)

const handleLooseLife = () => {
    showLifeLost.value = true
    api({
        url: '/api/lost',
        options: {
            method: 'POST'
        },
        data: {
            user: userStore.user.email
        }
    }).then((resp) => {
        userStore.lives = resp.lives
        guessesLeft.value = 10
        stickman.value.reset()
        usedCharacters.value = []
    })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            if (userStore.lives > 0) {
                showLifeLost.value = false
            }

        })
}

const hintVisible = ref(false)

const showHint = () => {
    hintVisible.value = true
}

const handleStart = () => {
    currentWord.value = wordsStore.getWordForLevel(userStore.level)
    gameStarted.value = true
}

const restart = () => {
    gameStarted.value = false
    showLifeLost.value = false
    countdownTimer.value.startNewGame()
}

</script>

<template>
    <div class="w-full flex flex-col h-full">
        <countdown ref="countdownTimer" @start-game="handleStart" v-show="!gameStarted && userStore.user"/>
        <template v-if="gameStarted">
            <Timer></Timer>
            <div class="w-full flex flex-col items-center">
                <WordContainer v-if="currentWord" :used-characters="usedCharacters"
                               :current-word="currentWord.word"/>
            </div>
            <div class="flex w-full h-full">
                <div class="w-full h-full  p-8">
                    <Stickman ref="stickman"/>
                </div>
                <div class="w-full flex flex-col items-center">
                    <h1 class="text-4xl text-white">Level: {{ userStore.level }}</h1>
                    <h1 class="text-4xl text-white mb-4">Lives Left: {{ userStore.lives }}</h1>

                    <Keyboard @select-char="handlePick" :used-characters="usedCharacters"/>
                    <div class="mt-8">
                        <template v-if="hintVisible">
                            <h2 class="text-white">{{ currentWord.hint }}</h2>
                        </template>
                        <UButton label="Show Hint" @click="showHint" v-if="!hintVisible"/>
                    </div>
                </div>
            </div>
        </template>
        <div class="fixed flex justify-center items-center z-20 top-0 bottom-0 left-0 right-0 bg-neutral-800/80 text-light-50"
             v-if="showLifeLost">
            <div class="flex flex-col items-center justify-center">
                <h1 class="text-4xl" v-if="userStore.lives > 0">You lost a life!</h1>
                <template v-else>
                    <h1 class="text-4xl mb-4">You're Dead!</h1>
                    <div class="flex justify-between space-x-4">
                        <UButton label="Start new game" @click="restart"/>  <UButton label="Leaderboard" @click="router.push('/leaders')"/>
                    </div>

                </template>
            </div>
        </div>
        <div class="fixed flex justify-center items-center z-20 top-0 bottom-0 left-0 right-0 bg-neutral-800/80 text-light-50"
             v-if="showComplete">
            <div class="flex flex-col items-center justify-center">
                <h1 class="text-4xl">Well done! You're a Hacker!</h1>
                <UButton label="Leaderboard" @click="router.push('/leaders')"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>