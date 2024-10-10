<script setup lang="ts">
const time = ref('00:00:00')

const started = ref(false)
const timeBegan = ref(null);
const running = ref(false)
function start() {
    if(running.value) return;
    if (timeBegan.value === null) {
        timeBegan.value = new Date();
    }
    started.value = setInterval(clockRunning, 10);
    running.value = true;
}

function zeroPrefix(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}

function clockRunning(){
    var currentTime = new Date()
        , timeElapsed = new Date(currentTime - timeBegan.value)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()

    time.value =
        zeroPrefix(hour, 2) + ":" +
        zeroPrefix(min, 2) + ":" +
        zeroPrefix(sec, 2)
};

onMounted(() => {
    start()
})

onBeforeUnmount(()=> {
    clearInterval(started.value);
})

</script>

<template>
    <div class="w-full flex items-center justify-center py-8">
        <div id="timer" class="text-white text-center">
            <h1>Time Hacking:</h1>
            <div class="text-5xl">
                {{time}}
            </div>
        </div>
    </div>

</template>

<style scoped>
#timer{
    font-family: 'Share Tech Mono', sans-serif;
}
</style>