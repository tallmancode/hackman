<script setup lang="ts"></script>

<template>
    <div id="layout" class="w-screen h-screen">
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
    background-image: url("./sec-bg.jpg");
    background-position: center;
    background-size: 100%;
    animation: animatedBackground 10s linear infinite alternate;
}
</style>
