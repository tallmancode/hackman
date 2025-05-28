<script setup lang="ts">
import secBg from './public/sec-bg.webp';
</script>

<template>
    <div id="layout" class="w-screen h-screen bg-cover overflow-y-auto after:" :style="{backgroundImage: `url(${secBg})`}">
        <div class=" py-10 md:py-0 px-4 md:px-0 min-h-full md:h-full bg-dark-900/60">
            <slot></slot>
        </div>

    </div>
</template>

<style scoped>
@keyframes animatedBackground {
    from {
        background-size: 100%;
    }
    to {
        background-size: 110%;
    }
}
#layout{
    background-position: center;
    background-size: 100%;
    animation: animatedBackground 10s linear infinite alternate;
}
</style>
