<script setup lang="ts">
const canvas = ref()

onMounted(() => {
    const ctx = canvas.value.getContext('2d')
    const dpr = window.devicePixelRatio
    const rect = canvas.value.getBoundingClientRect()
    canvas.value.width = rect.width * dpr
    canvas.value.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.strokeStyle = "white";
})

const reset = () => {
    const ctx = canvas.value.getContext('2d')
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
}

const draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
    const rect = canvas.value.getBoundingClientRect()
    const ctx = canvas.value.getContext('2d')
    ctx.moveTo($pathFromx, $pathFromy);
    ctx.lineTo($pathTox, $pathToy);
    ctx.stroke();
}

const head = () => {
    const ctx = canvas.value.getContext('2d')
    ctx.beginPath()
    ctx.arc(150, 100, 35, 0, 2 * Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
}

const frame1 = ()  => {
    draw (10, 490, 350, 490);
};

const frame2 = ()  => {
    draw (10, 10, 10, 500);
};

const frame3 = () => {
    draw (0, 10, 150, 10);
};

const frame4 = () =>  {
    draw (150, 10, 150, 65);
};
const torso = () => {
    draw (150, 135, 150, 250);
};

const leftArm = () => {
    draw (85, 150, 150, 170);
};

const rightArm = () => {
    draw (150, 170, 215, 150);
};

const leftLeg = () => {
    draw (85, 300, 150, 250);
};

const rightLeg = () => {
    draw (150, 250, 200, 300);
};


const drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

const animate = (index) => {
    drawArray[index]()
}

defineExpose({
    animate,
    reset
})

</script>

<template>
    <div class="bg-neutral-800/60 h-full flex flex-col justify-center items-center">
        <canvas ref="canvas" class="w-[400px] h-[500px]">Your browser does not support HTML5 canvas.</canvas>
    </div>
</template>

<style scoped>

</style>