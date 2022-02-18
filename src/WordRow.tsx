const LETTER_LENGTH = 5;
interface WordRowProps {
  letters: string;
}

export default function WordRow({ letters: letterProp = '' }: WordRowProps) {
  const letterRemaining = LETTER_LENGTH - letterProp.length;
  const letters = letterProp.split('').concat(Array(letterRemaining).fill(''));
  return (
    <div className="grid grid-cols-5 gap-4 mb-3">
      {letters.map((char) => (
        <CharBox key={char} value={char} />
      ))}
    </div>
  );
}

interface CharBoxProps {
  value: string;
}

function CharBox({ value }: CharBoxProps) {
  return <div className='inline-block text-center border-2 border-gray-500 p-4 text-2xl uppercase font-extrabold'>{value}</div>;
}
