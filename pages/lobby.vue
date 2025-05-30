<script setup lang="ts">
import {getHackmanApi} from "~/api-client";
import type {GameJsonldGamesUserRead} from "~/types/api";
const api = getHackmanApi()

const userGames = ref<GameJsonldGamesUserRead[] | null>(null)
const loading = ref(true)


onMounted(async () => {
    loading.value = true
    const games = await api.userGames()
    if(games.member.length > 0) {
        userGames.value = games.member
    }

    loading.value = false
})



function getTimeDifferenceInSeconds(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffInMilliseconds = (endDate - startDate);
    return Math.floor(diffInMilliseconds / 1000);
}


</script>

<template>
 <div class="flex-col md:flex-row flex h-full  text-light-50">
     <div class="flex container flex-col h-full w-full mx-auto items-center justify-center">
         <div class="max-w-[200px]">
             <NuxtImg src="/logo.png"></NuxtImg>
         </div>
         <div class="flex-col md:flex-row mb-4 flex container w-full mx-auto items-center">
             <div class="w-full flex flex-col items-center justify-center">
                 <div class="max-w-[400px]">
                     <h1 class="text-center text-xl font-bold mb-8">Operation Firewall: Crack the Code</h1>
                     <USeparator label="How To Play" />
                     <div class="mt-4 text-light-300">
                         <ul class="list-disc">
                             <li class="mb-2">
                                 You only have 3 chances to attempt the hack.
                             </li>
                             <li class="mb-2">
                                 You will have 3 passwords to hack.
                             </li>
                             <li class="mb-2">
                                 Each password will increase in difficulty
                             </li>
                             <li class="mb-2">
                                 You will have 3 lives to attempt cracking the passwords.
                             </li>
                             <li class="mb-2">
                                 You will need to attempt the hack in a single session! If you refresh your browser you
                                 will loose a chance.
                             </li>
                             <li class="mb-2">
                                 Once you have used all 3 chances you will not be able to attempt the hack again.
                             </li>
                         </ul>
                     </div>
                 </div>
             </div>
             <div class="w-full flex flex-col justify-center items-center space-y-4">
                 <template v-if="loading">
                     <USkeleton class="w-[250px] h-[24px]"  />
                     <USkeleton class="w-full h-[168px]"  />
                 </template>
                 <template v-else>
                     <div>Your Best Games</div>
                     <div v-if="!userGames">
                         You haven't completed any games
                     </div>
                     <div class="grid grid-cols-2 space-y-1 text-lg text-center bg-light-500/50 rounded">
                         <div class="w-[200px]">
                             Game Time
                         </div>
                         <div>
                             Lives Left
                         </div>
                         <template v-for="(game, index) in userGames" :key="index">
                             <div class="w-[200px]">
                                 {{game?.endDateTime ? getTimeDifferenceInSeconds(game?.startDateTime as string, game?.endDateTime as string)+ ' sec' : 'Not Completed'}}
                             </div>
                             <div>
                                 {{game?.lives}}
                             </div>
                         </template>
                     </div>
                 </template>
             </div>
         </div>
         <div class="w-full container  mx-auto flex space-x-4 justify-center items-center">
             <UButton color="primary" size="lg" to="/hackman"
                      class="w-full justify-center md:w-auto">
                 Get Hacking
             </UButton>
             <UButton color="primary" size="lg" to="/leaders"
                      class="w-full justify-center md:w-auto">
                 Leaderboard
             </UButton>
         </div>
     </div>
 </div>
</template>

<style scoped>

</style>