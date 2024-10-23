<script setup lang="ts">
import api from "~/utils/api/api";
const router = useRouter();
const leaders = ref()
onMounted(() => {
    api({
        url: '/api/leaderboard',
        options: {
            method: 'GET'
        }
    }).then((resp) => {
        leaders.value = resp
    })
        .catch((error) => {

        })
        .finally(() => {
        })
})


</script>

<template>
    <div class="h-full w-full bg-neutral-800/70 text-white ">
        <div class="flex flex-col container w-full mx-auto h-full items-center justify-center">
            <h1 class="text-4xl mb-4">Leaderboard</h1>
            <div class="grid grid-cols-4 min-w-[600px] text-pink-500 text-xl font-bold">
                <div></div>
                <div>Player</div>
                <div>Office</div>
                <div>Live left</div>
            </div>
            <div v-for="(leader, index) in leaders" class="grid grid-cols-4 min-w-[600px] text-lg">
                <div>{{ index + 1 }}</div>
                <div>{{leader.User.firstName}} {{leader.User.lastName}}</div>
                <div>{{leader.User.office}}</div>
                <div>{{leader.lives}}</div>
            </div>
            <div class="mt-8">
                <UButton label="Play Now" size="lg" type="button"  @click="router.push('/get-started')"></UButton>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>