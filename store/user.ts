import { defineStore } from "pinia";

export const useUser = defineStore("user",{
    id: 'user',
    state: () => ({
        user: undefined,
        lives: undefined,
        level: undefined,
        gameId: undefined
    }),
    actions: {
        setLives(lives){
            this.lives = lives
        },
        setLevel(level){
            this.level = level
        }
    }
})