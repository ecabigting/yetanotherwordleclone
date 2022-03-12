import { LETTER_LENGTH } from './App';
import {LetterState } from './word-utils'

interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
}

export default function WordRow({ letters: letterProp = '',result=[] ,className = ''}: WordRowProps) {

  const letterRemaining = LETTER_LENGTH - letterProp.length;
  const letters = letterProp.split('').concat(Array(letterRemaining).fill(''));

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char,ctr) => (
        <CharBox key={ctr} value={char} state={result[ctr]}/>
      ))}
    </div>
  );
}

interface CharBoxProps {
  value: string;
  state?: LetterState
}

function CharBox({ value,state }: CharBoxProps) {
  const stateStyles = state == null ? '' : characterStateStyles[state];
  return <span className={
    `inline-block text-center border-2 p-4 text-white rounded-2xl
    before:inline-block before:content-['_']
    border-gray-500 uppercase font-extrabold ${stateStyles}`
  }>{value}</span>;
}

const characterStateStyles = {
  null : 'text-black border-gray-500',
  [LetterState.Miss] : 'bg-gray-500 border-gray-500',
  [LetterState.Present] : 'bg-yellow-500 border-yellow-500',
  [LetterState.Match] : 'bg-green-500 border-green-500',
}
