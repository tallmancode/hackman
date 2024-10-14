<script setup lang="ts">
const props = defineProps<{usedCharacters: string[]; currentWord: string}>()

const wordObj = computed(() => {
    const returnObj = []
    for(var i = 0; i < props.currentWord.length; i++) {
        returnObj.push({char: props.currentWord[i], used: props.usedCharacters.includes(props.currentWord[i])})
    }

    return returnObj
})
</script>

<template>
<div class="flex gap-4 mb-8">
    <div v-for="obj in wordObj"  class="border-b border-white w-[40px] h-[55px] text-white  flex items-center justify-center pb-1 text-5xl">
        <template v-if="obj.used">
           {{ obj.char }}
        </template>
    </div>
</div>
</template>

<style scoped>

</style>