<script setup lang="ts">
import secBg from './public/sec-bg.jpg';
</script>

<template>
    <div id="layout" class="w-screen h-screen" :style="{backgroundImage: `url(${secBg})`}">
        <slot></slot>
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
