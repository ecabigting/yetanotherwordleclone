import wordBank from './word-bank.json';

export function getRandomWord()
{
    const randomIndex = Math.floor(Math.random() * wordBank.valid.length);
    return wordBank.valid[randomIndex];
}