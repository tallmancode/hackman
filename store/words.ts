import { defineStore } from "pinia";

export const useWords = defineStore("words",{
    id: 'words',
    state: () => ({
        words: [
            {
                "id": 187,
                "word": "123456",
                "level": 1,
                "hint": "The first six numbers in sequence"
            },
            {
                "id": 188,
                "word": "password",
                "level": 1,
                "hint": "What you are typing right now"
            },
            {
                "id": 189,
                "word": "qwerty",
                "level": 1,
                "hint": "Top row of letters on a standard keyboard."
            },
            {
                "id": 190,
                "word": "abcdef",
                "level": 1,
                "hint": "First six letters of the alphabet."
            },
            {
                "id": 191,
                "word": "iloveyou",
                "level": 1,
                "hint": "A three-word romantic phrase"
            },
            {
                "id": 192,
                "word": "superman",
                "level": 1,
                "hint": "A famous superhero in red and blue."
            },
            {
                "id": 193,
                "word": "dragon",
                "level": 1,
                "hint": "A mythical creature that breathes fire."
            },
            {
                "id": 194,
                "word": "betway",
                "level": 1,
                "hint": "The best sport betting company in the world."
            },
            {
                "id": 195,
                "word": "monkey",
                "level": 1,
                "hint": "A playful animal that likes bananas."
            },
            {
                "id": 196,
                "word": "welcome",
                "level": 1,
                "hint": "A greeting to make someone feel at home."
            },
            {
                "id": 197,
                "word": "quietmountain",
                "level": 2,
                "hint": "A peaceful peak."
            },
            {
                "id": 198,
                "word": "bluebutterfly",
                "level": 2,
                "hint": "A winged insect in a cool color."
            },
            {
                "id": 199,
                "word": "hiddencanyon",
                "level": 2,
                "hint": "A secret valley."
            },
            {
                "id": 200,
                "word": "silvernight",
                "level": 2,
                "hint": "A night under the moon\u2019s glow."
            },
            {
                "id": 201,
                "word": "stormyclouds",
                "level": 2,
                "hint": "Dark skies filled with weather."
            },
            {
                "id": 202,
                "word": "greenmeadow",
                "level": 2,
                "hint": "A field full of grass."
            },
            {
                "id": 203,
                "word": "whisperingwind",
                "level": 2,
                "hint": "A soft breeze that speaks."
            },
            {
                "id": 204,
                "word": "autumnleaves",
                "level": 2,
                "hint": "What falls from trees in October."
            },
            {
                "id": 205,
                "word": "shadowforest",
                "level": 2,
                "hint": "A dark place with trees."
            },
            {
                "id": 206,
                "word": "starryskies",
                "level": 2,
                "hint": "A night sky filled with lights."
            },
            {
                "id": 207,
                "word": "endlesssummerdays",
                "level": 3,
                "hint": "Warm season that feels eternal."
            },
            {
                "id": 208,
                "word": "thelightbehindclouds",
                "level": 3,
                "hint": "A hidden sun."
            },
            {
                "id": 209,
                "word": "windblowingovercliffs",
                "level": 3,
                "hint": "A breeze along steep rocks."
            },
            {
                "id": 210,
                "word": "songsfromtheocean",
                "level": 3,
                "hint": "Melodies carried by waves."
            },
            {
                "id": 211,
                "word": "storiesbythecampfire",
                "level": 3,
                "hint": "Tales told around flames."
            },
            {
                "id": 212,
                "word": "shadowsbeneathtrees",
                "level": 3,
                "hint": "Darkness under branches."
            },
            {
                "id": 213,
                "word": "mistcoveringthemountains",
                "level": 3,
                "hint": "Fog on tall peaks."
            },
            {
                "id": 214,
                "word": "birdsflyingtothenorth",
                "level": 3,
                "hint": "Seasonal migration."
            },
            {
                "id": 215,
                "word": "flowersbloominthemeadow",
                "level": 3,
                "hint": "Springtime awakening."
            },
            {
                "id": 216,
                "word": "wavescrashingontheshore",
                "level": 3,
                "hint": "Sea meeting land."
            }
        ],
    }),
    actions: {
        getWordForLevel(level){
            if( !this.words) return undefined
            const words = this.words.filter(word => word.level === level)

            const random = Math.floor(Math.random() * words.length);
            const word = words[random]
            if(word){
                word.word = word.word.replace(/\s+$/, '')
            }
            return word
        }
    }
})