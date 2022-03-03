import React, { useState } from 'react'
import { userStore,GUESS_LENGTH } from './store';
import WordRow from './WordRow'


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

  let rows = [...state.rows];

  if(rows.length < GUESS_LENGTH)
  {
    rows.push({guess});
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;

  const gameOver = state.gameState !== 'playing';

  rows = rows.concat(...Array(numberOfGuessesRemaining).fill(''));

  return (
    <div className='mx-auto w-96 relative'>
      <header className='border-b border-gray-500 pb-2 mb-2 my-2'>
          <h1 className='text-4xl text-center'>YetAnotherWordleClone</h1>

          <div>
            <input type="text" 
              className='w-1/2 p-2 border-2 border-gray-500'
              value={guess} onChange={onChange} 
              disabled={gameOver}/>
          </div>
      </header>

      

      <main className='grid grid-rows-6 gap-4'>
        {rows.map(({guess,result},index)=> (
            <WordRow letters={guess} key={index} result={result}/>
          ))
        }
      </main>

      {gameOver && (
        <div role="modal" 
        className='absolute bg-white
              left-0 right-0 top-1/4 p-6 w-3/4 mx-auto rounded border border-gray-500 text-center'>
            Game Over!
            <button className='block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow' onClick={()=>{
              state.newGame();
              setGuess('');
            }}>Restart</button>
        </div>
      )}
    </div>
  )
}
