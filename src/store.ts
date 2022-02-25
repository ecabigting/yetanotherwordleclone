import create from "zustand"
import { persist } from "zustand/middleware"
import { getRandomWord } from "./word-utils";

interface StoreState {
    answer: string,
    guesses: string[],
    addGuess: (guess:string) => void;
    newGame: () => void;
}

export const userStore = create<StoreState>(persist(
    (set) => ({
        answer: getRandomWord(),
        guesses: ['buguk','kuyad','lanam'],
        addGuess: (guess:string) => {
            set((state) => ({
                guesses: [...state.guesses,guess]
            }))
        },
        newGame:()=> {
            set({
                answer: getRandomWord(),
                guesses: [],
            })
        }
    }),
    { 
        name: "bale-ng-soy"
    }
));