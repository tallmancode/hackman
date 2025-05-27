<script setup lang="ts">
import CryptoJS from 'crypto-js'
import WordContainer from "~/components/WordContainer.vue";
import {useUser} from "~/store/user";
import Countdown from "~/components/countdown.vue";
import decrypt from '~/utils/decrypt'
import {useWords} from "~/store/words";
// import api from "~/utils/api/api";
import {getHackmanApi} from "~/api-client";
import {setCookies} from "~/composables/useAuth";
import type {AxiosError} from "axios";

const router = useRouter();
const gameStarted = ref()
const currentWord = ref()
const usedCharacters = ref<string[]>([])
const api = getHackmanApi()
const lives = ref()
const level = ref()
const gameID = ref()

const handleStart = async () => {
    const resp = await api.gameStart({})
    const decypt = decrypt('encryptionkey', resp.gameLevels[0].word.word)
    resp.gameLevels[0].word.word = decypt
    currentWord.value = resp.gameLevels[0].word;
    level.value = resp.gameLevels[0].word.level
    gameID.value = resp.hash
    lives.value = resp.lives
}

onMounted(() => {
    handleStart()
})

const stickman = ref()
const guessesLeft = ref(10);
const correct = ref(0)
const showComplete = ref(false)
const countdownTimer = ref()
const timer = ref()

const handleStop = () => {
    if (timer.value) {
        timer.value.stop()
    }
}

const startGame = () => {
    gameStarted.value = true
}

const handlePick = (char: string) => {
    if (showLifeLost.value) return
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
            levelUp()
        }
    }
}


const endGame = () => {
    handleStop();
}

const levelUp = async () => {
    try {
        const resp = await api.gameLevelup(gameID.value, {
            wordId: currentWord.value['@id'],
            answer: currentWord.value.word
        })

        if (resp.endDateTime) {
            if (timer.value) {
                timer.value.stop()
            }
            showComplete.value = true
        }
        guessesLeft.value = 10
        lives.value = resp.lives
        correct.value = 0
        usedCharacters.value = []
        stickman.value.reset()
        const maxLevel = Math.max(...resp.gameLevels.map(gl => gl.word.level))

        const highestLevel = resp.gameLevels.find(gl => gl.word.level === maxLevel)
        const decypt = decrypt('encryptionkey', highestLevel.word.word)
        highestLevel.word.word = decypt
        currentWord.value = highestLevel.word
        level.value = highestLevel.word.level
    } catch (err: AxiosError) {
        if (err?.response?.status === 400) {
            setCookies(undefined, undefined)
            router.push('/login')
        }
        return
    }


}

const showLifeLost = ref(false)

const handleLooseLife = async () => {
    showLifeLost.value = true
    const resp = await api.apiGamedieHashPut(gameID.value, {})
    if (resp.lives === 0) {
        lives.value = resp.lives
        handleStop()
        return
    }

    guessesLeft.value = 10
    lives.value = resp.lives
    correct.value = 0
    usedCharacters.value = []
    stickman.value.reset()
    showLifeLost.value = false
}
const hintVisible = ref(false)

const showHint = () => {
    hintVisible.value = true
}

const restart = () => {
    gameStarted.value = false
    showLifeLost.value = false
    countdownTimer.value.startNewGame()
}

</script>

<template>
    <div class="w-full flex flex-col h-full">
        <countdown ref="countdownTimer" @start-game="startGame" v-show="!gameStarted"/>
        <template v-if="gameStarted">
            <Timer ref="timer"></Timer>
            <div class="w-full flex flex-col items-center">
                <WordContainer v-if="currentWord" :used-characters="usedCharacters"
                               :current-word="currentWord.word"/>
            </div>
            <div class="flex w-full h-full">
                <div class="w-full h-full  p-8">
                    <Stickman ref="stickman"/>
                </div>
                <div class="w-full flex flex-col items-center">
                    <h1 class="text-4xl text-white">Level: {{ level }}</h1>
                    <h1 class="text-4xl text-white mb-4">Lives Left: {{ lives }}</h1>

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
        <div
            class="fixed flex justify-center items-center z-20 top-0 bottom-0 left-0 right-0 bg-neutral-800/80 text-light-50"
            v-if="showLifeLost">
            <div class="flex flex-col items-center justify-center">
                <h1 class="text-4xl" v-if="lives > 0">You lost a life!</h1>
                <template v-else>
                    <h1 class="text-4xl mb-4">You're Dead!</h1>
                    <div class="flex justify-between space-x-4">
                        <UButton label="Start new game" @click="restart"/>
                        <UButton label="Leaderboard" @click="router.push('/leaders')"/>
                    </div>

                </template>
            </div>
        </div>
        <div
            class="fixed flex justify-center items-center z-20 top-0 bottom-0 left-0 right-0 bg-neutral-800/80 text-light-50"
            v-if="showComplete">
            <div class="flex flex-col items-center justify-center">
                <h1 class="text-4xl mb-4">Well done! You're a Hacker!</h1>
                <UButton label="Back to lobby" @click="router.push('/lobby')"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>