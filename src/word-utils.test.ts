import { describe, expect, it } from 'vitest'
import { getRandomWord } from './word-utils'

describe('workd-utils', () => {
  it('random word', () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  })
})