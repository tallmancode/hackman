<script setup lang="ts">
var alphabet = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

const props = defineProps<{usedCharacters: string[]}>()

const emit = defineEmits<{
    (event: 'selectChar', value: string): void
}>()

const handleKeyPress = (event) => {
    if (alphabet.includes(event.key) && !props.usedCharacters.includes(event.key)) {
        emit('selectChar', event.key)
    }
}

onMounted(() => {
    document.addEventListener("keypress", handleKeyPress);
})

onBeforeUnmount(() => {
    document.removeEventListener("keypress", handleKeyPress);
})
</script>

<template>
<div>
    <ul class="flex flex-wrap gap-2 justify-center max-w-[450px]">
        <li v-for="character in alphabet" >
            <UButton size="lg" @click="emit('selectChar', character)" :disabled="usedCharacters.includes(character)">{{ character }}</UButton>
        </li>
    </ul>
</div>
</template>

<style scoped>

</style>