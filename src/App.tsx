import React, { useEffect, useRef, useState } from 'react';
import Keyboard from './Keyboard';
import { userStore, GUESS_LENGTH } from './store';
import { isValidWord } from './word-utils';
import WordRow from './WordRow';

export const LETTER_LENGTH = 5;

export default function App() {
  const state = userStore();
  const [guess, setGuess,addGuessLetter] = useGuess();
  const [showInvalidGuess, setInvalidGuess] = useState(false);
  const addGuess = userStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);

  useEffect(() => {
    let id: any;
    if (setInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 1500);
    }

    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess);
        setInvalidGuess(false);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  let rows = [...state.rows];

  let currentRow = 0;

  if (rows.length < GUESS_LENGTH) {
    currentRow = rows.push({ guess }) - 1;
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;

  const gameOver = state.gameState !== 'playing';

  rows = rows.concat(...Array(numberOfGuessesRemaining).fill(''));

  return (
    <div className='mx-auto w-96 relative'>
      <header className='border-b border-gray-500 pb-2 mb-2 my-2'>
        <h1 className='text-4xl text-center text-white'>YetAnotherWordleClone</h1>
      </header>

      <main className='grid grid-rows-6 gap-4'>
        {rows.map(({ guess, result }, index) => (
          <WordRow
            letters={guess}
            key={index}
            result={result}
            className={currentRow === index && showInvalidGuess ? 'animate-bounce' : ''}
          />
        ))}
      </main>

      <Keyboard onClick={letter => {
        addGuessLetter(letter);
      }}/>

      {gameOver && (
        <div
          role='modal'
          className='absolute bg-white
              left-0 right-0 top-1/4 p-6 w-3/4 mx-auto rounded border border-gray-500 text-center'
        >
          Game Over!
          <h4 className=''>word is : {state.answer}</h4>
          <button
            className='block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow'
            onClick={() => {
              state.newGame();
              setGuess('');
            }}
          >
            Restart
          </button>
        </div>
      )}

    </div>

    
  );
}

function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>,(letter:string)=> void] {
  const [guess, setGuess] = useState('');

  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      const newGuess = letter.length === 1 ? curGuess + letter : curGuess;

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
          if (newGuess.length === LETTER_LENGTH) {
            return '';
          }
      }

      if (curGuess.length === LETTER_LENGTH) {
        return curGuess;
      }

      return newGuess;
    });
  }

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return [guess, setGuess,addGuessLetter];
}

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
