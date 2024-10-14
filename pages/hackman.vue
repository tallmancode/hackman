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
    const word = wordsStore.getWordForLevel(1)
    currentWord.value = word
})

// function beforeUnload(e: Event) {
//     const confirmationMessage = 'Are you sure you want to leave this page?'
//     e.preventDefault()
//     e.returnValue = true // Gecko + IE, for old browsers
// }
//
// onMounted(() => {
//     console.log('asdasd')
//     // window.addEventListener('beforeunload', beforeUnload)
// })
//
// onBeforeUnmount(() => {
//     window.removeEventListener('beforeunload', beforeUnload)
// })

const stickman = ref()
const guessesLeft = ref(10);
const correct = ref(0)

const handlePick = (char) => {
    usedCharacters.value.push(char)
    if (currentWord.value.word.indexOf(char) === -1) {
        guessesLeft.value -= 1
        stickman.value.animate(guessesLeft.value)
        if (guessesLeft.value === 0) {
            handleLooseLife()
        }
    }else{
        for (let i = 0; i < currentWord.value.word.length; i++) {
            if (currentWord.value.word.charAt(i) === char) {
                correct.value += 1
            }
        }
        if(currentWord.value.word.length === correct.value) {
            handleWin()
        }

        console.log(correct.value,  currentWord.value.word.length)
    }
}


const handleWin = () => {
    if(userStore.level === 3) {
        endGame()
    }else{
        userStore.level += 1
        guessesLeft.value = 10
        stickman.value.reset()
        correct.value = 0
        usedCharacters.value = []
        currentWord.value = wordsStore.getWordForLevel(userStore.level)
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
            lives: userStore.lives ,
            level: userStore.level === 4 ? 3 : userStore.lives
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

const handleLooseLife = () => {
    api({
        url: '/api/lost',
        options: {
            method: 'POST'
        },
        data: {
            user: userStore.user.email
        }
    }).then((resp) => {
        console.log(resp, userStore, userStore.lives)
        userStore.lives = resp.lives
        guessesLeft.value = 10

        stickman.value.reset()
    })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
        })
}

const hintVisible = ref(false)

const showHint = () => {
    hintVisible.value = true
}
</script>

<template>
    <div class="w-full flex flex-col h-full">
        <countdown @start-game="gameStarted = true" v-if="!gameStarted && userStore.user"/>
        <template v-if="gameStarted">
            <Timer></Timer>
            <div class="flex w-full h-full">
                <div class="w-full h-full  p-8">
                    <Stickman ref="stickman"/>
                </div>
                <div class="w-full flex flex-col items-center">
                    <h1 class="text-4xl text-white">Level: {{ userStore.level }}</h1>
                    <h1 class="text-4xl text-white">Lives Left: {{ userStore.lives }}</h1>
                    <WordContainer v-if="currentWord" :used-characters="usedCharacters"
                                   :current-word="currentWord.word"/>
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

    </div>
</template>

<style scoped>

</style>