import create from "zustand"
import { persist } from "zustand/middleware"
import { getRandomWord } from "./word-utils";

interface StoreState {
    answer: string,
    guesses: string[],
    addGuess: (guess:string) => void;
}

export const userStore = create<StoreState>(persist(
    (set) => ({
        answer: getRandomWord(),
        guesses: ['buguk','kuyad','lanam'],
        addGuess: (guess:string) => {
            set((state) => ({
                guesses: [...state.guesses,guess]
            }))
        }
    }),
    { 
        name: "bale-ng-soy"
    }
));