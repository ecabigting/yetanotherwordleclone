import React, { useState } from 'react'
import { userStore } from './store';
import WordRow from './WordRow'

const GUESS_LENGTH = 6;
export const LETTER_LENGTH = 5;

export default function App() {
  const state = userStore();
  const [guess,setGuess] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;
    if(newGuess.length === LETTER_LENGTH){
      state.addGuess(newGuess);
      setGuess('');
      return;
    }
    setGuess(e.target.value);
  };

  let rows = [...state.guesses];

  if(rows.length < GUESS_LENGTH)
  {
    rows.push(guess);
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;
  rows = rows.concat(...Array(numberOfGuessesRemaining).fill(''));
  
  return (
    <div className='mx-auto w-96'>
      <header className='border-b border-gray-500 pb-2 mb-2 my-2'>
          <h1 className='text-4xl text-center'>YetAnotherWordleClone</h1>

          <div>
            <input type="text" 
              className='w-1/2 p-2 border-2 border-gray-500'
            value={guess} onChange={onChange} />
          </div>

      </header>

      

      <main className='grid grid-rows-6 gap-4'>
        {rows.map((word,index)=> (
            <WordRow letters={word} key={index}/>
          ))
        }
      </main>
    </div>
  )
}
