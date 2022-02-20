import { describe, expect, it } from 'vitest'
import { computeGuess, getRandomWord, LetterState } from './word-utils'

describe('getRandomWord', () => {
  it('random word', () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  })
})

describe('computeGuess', () => {
  it('match and present', () => {
    expect(computeGuess('boost','basic')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss
    ]);
  });

  it('all match', () => {
    expect(computeGuess('paper','paper')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match
    ]);
  });

  it('full miss', () => {
    expect(computeGuess('brand','helps')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss
    ]);
  })

  it('one match two letters are present', () => {
    expect(computeGuess('solid','boost')).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss
    ]);
  })
});