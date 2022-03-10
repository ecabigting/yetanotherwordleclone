import create from 'zustand';
import { persist } from 'zustand/middleware';
import { computeGuess, getRandomWord, LetterState } from './word-utils';

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  addGuess: (guess: string) => void;
  newGame: (initialGuess?: string[]) => void;
}

export const GUESS_LENGTH = 6;

export const userStore = create<StoreState>(
  persist(
    (set, get) => {
      function addGuess(guess: string) {
        const result = computeGuess(guess, get().answer);
  
        const playerWon = result.every((i) => i === LetterState.Match);
  
        const rows = [
          ...get().rows,
          {
            guess,
            result,
          },
        ];
  
        set(() => ({
          rows,
          gameState: playerWon ? 'won' : rows.length === GUESS_LENGTH ? 'lost' : 'playing',
        }));
      };
      
      return ({
        answer: getRandomWord(),
        rows: [],
        gameState: 'playing',
        addGuess,
        newGame: (initialRows = []) => {
          set({
            answer: getRandomWord(),
            rows: [],
            gameState: 'playing',
          });

          initialRows.forEach(addGuess);
        },
      })
    },
    {
      name: 'bale-ng-soy',
    }
  )
);
