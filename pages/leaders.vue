<script setup lang="ts">
import {getHackmanApi} from "~/api-client";

definePageMeta({
    allow: true
})

const api = getHackmanApi()
const loading = ref(false)
const leaders = ref()
onMounted(async () => {
    loading.value = true
    const games = await api.leaderboard()
    leaders.value = games.member

    loading.value = false
})

function getTimeDifferenceInSeconds(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffInMilliseconds = endDate - startDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    return diffInSeconds;
}

const endCheck = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', timeStyle: "short", dateStyle: 'short' });
    const date = formatter.format(now)
    const publicConfig = useRuntimeConfig();
    if(Date.parse(publicConfig.public.endtime) <= Date.parse(date)){
        return true
    }
    return false
}

</script>

<template>
    <div class="h-full w-full  text-white ">
        <div class="flex flex-col container w-full mx-auto h-full items-center justify-center text-center">
            <p v-if="endCheck()">Hackman has ended</p>
            <h1 class="text-4xl mb-4">Leaderboard</h1>
            <div class="grid grid-cols-4 w-[750px] text-pink-500 text-xl font-bold">
                <div>Rank</div>
                <div>Player</div>
                <div>Time Taken</div>
                <div>Level</div>
            </div>
            <div v-for="(leader, index) in leaders" class="grid grid-cols-4 w-[750px] text-lg">
                <div>{{ index + 1 }}</div>
                <div class="overflow-hidden truncate">{{leader.user.firstName}} {{leader.user.lastName}}</div>
                <div>
                    {{getTimeDifferenceInSeconds(leader.startDateTime, leader.endDateTime)}} sec
                </div>
                <div >{{leader.lives}}</div>
            </div>
            <div class="mt-8" v-if="!endCheck()">
                <UButton label="Play Now" size="lg" type="button"  to="/lobby"></UButton>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>