<script setup lang="ts">

import WordContainer from "~/components/WordContainer.vue";

const currentWord = 'password'
const usedCharacters = ref([])

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

const handlePick = (char) => {
    usedCharacters.value.push(char)
    if(currentWord.indexOf(char) === -1) {
        lives.value -= 1
        stickman.value.animate(lives.value)
    }
}


const lives = ref(10)
</script>

<template>
    <div class="w-full flex flex-col h-full">
        <Timer></Timer>
        <div class="flex w-full h-full">
            <div class="w-full h-full  p-8">
                <Stickman ref="stickman"/>
            </div>
            <div class="w-full flex flex-col items-center">
                <WordContainer :used-characters="usedCharacters" :current-word="currentWord"/>
                <Keyboard @select-char="handlePick" :used-characters="usedCharacters"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>