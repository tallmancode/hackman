import { defineStore } from "pinia";

export const useWords = defineStore("words",{
    id: 'words',
    state: () => ({
        words: undefined,
    }),
    actions: {
        getWordForLevel(level){
            if( !this.words) return undefined
            const words = this.words.filter(word => word.level === level)
            const random = Math.floor(Math.random() * words.length);
            return words[random]
        }
    }
})