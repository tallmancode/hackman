<script setup lang="ts">
import {getHackmanApi} from "~/api-client";
import type { GameGamesUserRead} from "~/types/api";
const router = useRouter()
const api = getHackmanApi()

const userGames = ref<GameGamesUserRead | null>(null)



onMounted(async () => {
    const games = await api.userGames()

    userGames.value = games.member
})



function getTimeDifferenceInSeconds(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffInMilliseconds = (endDate - startDate);
    return Math.floor(diffInMilliseconds / 1000);
}
</script>

<template>
 <div class="flex h-full flex-col items-center justify-center  space-y-4">

     <div class="w-full flex flex-col justify-center items-center space-y-4">
         <div>Your Best Games</div>
         <div v-if="!userGames">
             You havent completed any games
         </div>
         <div class="grid grid-cols-2 text-lg text-center bg-dark-900/50 rounded">
             <div class="w-[200px]">
                 Game Time
             </div>
             <div>
                 Lives Left
             </div>
             <template v-for="(game, index) in userGames" >
                 <div class="w-[200px]">
                     {{getTimeDifferenceInSeconds(game?.startDateTime, game?.endDateTime)}} sec
                 </div>
                 <div>
                     {{game.lives}}
                 </div>
             </template>
         </div>
     </div>

     <div class="w-full flex justify-center items-center">
         <UButton color="primary" size="lg" type="submit"
                  @click="router.push('/hackman')"
                  :ui="{variant: {solid: 'dark:text-light-50 text-light-50'}}"
                  class="w-full justify-center md:w-auto">
             Get Hacking
         </UButton>
     </div>
 </div>
</template>

<style scoped>

</style>