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
        .catch(() => {
            showError({statusCode: 500, statusMessage: 'Error'})
        })
        .finally(() => {
        })
})
function formatString(str) {
    return str
        .split('-') // Split the string by hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words with spaces
}

function getTimeDifferenceInSeconds(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffInMilliseconds = endDate - startDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    return diffInSeconds;
}

</script>

<template>
    <div class="h-full w-full bg-neutral-800/70 text-white ">
        <div class="flex flex-col container w-full mx-auto h-full items-center justify-center text-center">
            <h1 class="text-4xl mb-4">Leaderboard</h1>
            <div class="grid grid-cols-6 w-[750px] text-pink-500 text-xl font-bold">
                <div></div>
                <div>Player</div>
                <div>Office</div>
                <div>Time Taken</div>
                <div>Level</div>
                <div>Lives left</div>
            </div>
            <div v-for="(leader, index) in leaders" class="grid grid-cols-6 w-[750px] text-lg">
                <div>{{ index + 1 }}</div>
                <div class="overflow-hidden truncate">{{leader.User.firstName}} {{leader.User.lastName}}</div>
                <div>{{formatString(leader.User.office)}}</div>
                <div>
                    {{getTimeDifferenceInSeconds(leader.start, leader.end)}} sec
                </div>
                <div >{{leader.level}}</div>
                <div >{{leader.lives}}</div>
            </div>
            <div class="mt-8">
                <UButton label="Play Now" size="lg" type="button"  @click="router.push('/get-started')"></UButton>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>