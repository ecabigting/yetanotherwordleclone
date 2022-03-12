import wordBank from './word-bank.json';

const word = getRandomWord();

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordBank.valid.length);
  return wordBank.valid[randomIndex];
}

export enum LetterState {
  Miss = 'Miss',
  Present = 'Present',
  Match = 'Match',
}

export function computeGuess(guess: string, answerString: string): LetterState[] {
  const result: LetterState[] = [];

    if(guess.length !== answerString.length)
    {
        return result;
    }

    const answer = answerString.split('');
    const guessAsArray = guess.split('');
    const answerLetterCount : Record<string,number> = {};

    guessAsArray.forEach((letter,index)=>{
        const currentAnswerLetter = answer[index];

        answerLetterCount[currentAnswerLetter] = answerLetterCount[
            currentAnswerLetter
        ] 
            ? answerLetterCount[currentAnswerLetter] + 1 
            : 1;

        if(currentAnswerLetter === letter) 
        {
            result.push(LetterState.Match);
        }else if(answer.includes(letter))
        {
            result.push(LetterState.Present);
        }else 
        {
            result.push(LetterState.Miss);
        }
    });

    result.forEach((curResult,resultIndex)=>{
        if(curResult !== LetterState.Present) return;
    
        const guessLetter = guessAsArray[resultIndex];

        answer.forEach((currentAnswerLetter, answerIndex) => {
            if(currentAnswerLetter !== guessLetter) return;

            if(result[answerIndex] === LetterState.Match) {
                result[resultIndex] = LetterState.Miss;
            }

            if(answerLetterCount[guessLetter] <= 0) 
            {
                result[resultIndex] = LetterState.Miss;
            }
        });
        answerLetterCount[guessLetter]--;
    });


  return result;
}

export function isValidWord(word: string) : boolean {
    return wordBank.valid.includes(word);
}
