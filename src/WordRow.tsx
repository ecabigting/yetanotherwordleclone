import { LETTER_LENGTH } from './App';
import { userStore } from './store';
import { computeGuess, LetterState } from './word-utils'

interface WordRowProps {
  letters: string;
}

export default function WordRow({ letters: letterProp = '' }: WordRowProps) {
  const answer = userStore((state)=> state.answer)
  const letterRemaining = LETTER_LENGTH - letterProp.length;
  const letters = letterProp.split('').concat(Array(letterRemaining).fill(''));

  const guessStates = computeGuess(letterProp,answer);

  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char,ctr) => (
        <CharBox key={ctr} value={char} state={guessStates[ctr]}/>
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
  return <div className={
    `inline-block text-center border-2 p-4 h-16 text-2xl bg-gray-500  border-gray-500 uppercase font-extrabold ${stateStyles}`
  }>{value}</div>;
}

const characterStateStyles = {
  null : 'text-black border-gray-500',
  [LetterState.Miss] : 'bg-gray-500 border-gray-500',
  [LetterState.Present] : 'bg-yellow-500 border-yellow-500',
  [LetterState.Match] : 'bg-green-500 border-green-500',
}
