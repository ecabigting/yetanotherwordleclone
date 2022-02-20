import wordBank from './word-bank.json';

export function getRandomWord()
{
    const randomIndex = Math.floor(Math.random() * wordBank.valid.length);
    return wordBank.valid[randomIndex];
}


export enum LetterState 
{
    Miss='Miss',
    Present='Present',
    Match='Match'
}

export function computeGuess(guess:string, answerString:string) : LetterState []
{
    const guessArray = guess.split('');
    const answerArray = answerString.split('');
    const result: LetterState[] = [];
    
    guessArray.forEach((letter,index)=>{
        if(letter == answerArray[index]){
            result.push(LetterState.Match);
        }else if(answerArray.includes(letter)) 
        {
            result.push(LetterState.Present);
        }else
            result.push(LetterState.Miss);
    });
    
    return result;
}