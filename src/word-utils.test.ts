import { describe, expect, it } from 'vitest'
import { computeGuess, getRandomWord, isValidWord, LetterState } from './word-utils'

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

  it('two letters are present but answer only has one of that letter', () => {
    expect(computeGuess('allol','smelt')).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss
    ]);
  })

  it('1 letter is match but has multiple instance in the word', () => {
    expect(computeGuess('allol','colon')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss
    ]);
  })

  describe('isWordValid', () => {
    it('is a valid word', () => {
      expect(isValidWord('boost')).toBe(true);
    })

    it('is an invalid word', () => {
      expect(isValidWord('drashg')).toBe(false);
    })
  })
  
});