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
  newGame: () => void;
}

export const GUESS_LENGTH = 6;

export const userStore = create<StoreState>(
  persist(
    (set, get) => ({
      answer: getRandomWord(),
      rows: [],
      gameState: 'playing',
      addGuess: (guess: string) => {
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
      },
      newGame: () => {
        set({
          answer: getRandomWord(),
          rows: [],
          gameState: 'playing',
        });
      },
    }),
    {
      name: 'bale-ng-soy',
    }
  )
);
