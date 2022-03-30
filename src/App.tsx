import React, { useEffect, useRef, useState } from 'react';
import Keyboard from './Keyboard';
import { userStore, GUESS_LENGTH } from './store';
import { isValidWord, LetterState } from './word-utils';
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
      <header className='border-b border-gray-500 py-3 text-center'>
      <span className={
        `inline-block text-center border-2 p-3 m-1 text-white 
        text-sm
        bg-gray-500 border-gray-500 uppercase font-extrabold `
      }>P</span>

      <span className={
          `inline-block text-center border-2 p-3 m-1 text-white 
          text-sm
          bg-green-500 border-green-500 uppercase font-extrabold `
        }>A</span>

<span className={
          `inline-block text-center border-2 p-3 m-1 text-white 
          text-sm
          bg-green-500 border-green-500 uppercase font-extrabold `
        }>M</span>

<span className={
          `inline-block text-center border-2 p-3 m-1 text-white 
          text-sm
          bg-green-500 border-green-500 uppercase font-extrabold `
        }>A</span>

<span className={
          `inline-block text-center border-2 p-3 m-1 text-white 
          text-sm
          bg-green-500 border-green-500 uppercase font-extrabold `
        }>N</span>

<span className={
          `inline-block text-center border-2 p-3 m-1 text-white 
          text-sm
          bg-green-500 border-green-500 uppercase font-extrabold `
        }>U</span>

<span className={
          `inline-block text-center border-2 p-3 m-1 text-white 
          text-sm
          bg-gray-500 border-gray-500 uppercase font-extrabold `
        }>L</span>

<span className={
          `inline-block text-center border-2 p-3 m-1 text-white 
          text-sm
          bg-yellow-500 border-yellow-500 uppercase font-extrabold `
        }>A</span>

        <span className='text-gray-300 text-center text-xs'>balamu wordle yamu naman oneng kapampangan la reng amanu..</span>
      </header>

      <main className='grid grid-rows-6 gap-4 p-2'>
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
          { state.gameState == 'won' && (<span className='text-bold'>Aba! Sinambut ya!</span>)} 

          { state.gameState == 'lost' && (<span className='text-bold'>Mesambut ata soy!?</span>)} 

          <h4 className=''>Ing amanu : <span className='text-bold uppercase text-2xl' >{state.answer}</span></h4>
          <button
            className='block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow'
            onClick={() => {
              state.newGame();
              setGuess('');
            }}
          >
            Bayung Piyalung!
          </button>
        </div>
      )}

    <footer className='w-full text-black text-center absolute mt-14 text-sm bg-gray-300 p-1'>
      <a className='inline-block' href="https://github.com/ecabigting/yetanotherwordleclone/tree/kapampangan_version">
        <img height="24" width="24" src="https://unpkg.com/simple-icons@v6/icons/github.svg"/>
      </a>
    </footer>
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
