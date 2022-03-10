import { describe, expect, it } from 'vitest'
import App from './App'
import { userStore } from './store'
import { render, screen,userEvent } from './test/test-utils'

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />)
    expect(screen.getByText(/YetAnotherWordleClone/i)).toBeInTheDocument()
  })

  it('is currently empty state', () => {
    userStore.getState().newGame([]);
    render(<App />)
    expect(screen.queryByText('Game Over!')).toBeNull();
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    expect(document.querySelector('main')?.textContent).toEqual('');
  })

  it('currently shows one row of guesses', () => {
    userStore.getState().newGame(['hello']);
    render(<App />)
    expect(document.querySelector('main')?.textContent).toEqual('hello');
  })

  it('is currently loosing state', () => {
    userStore.getState().newGame(Array(6).fill('hello'));
    render(<App />)
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  })

  it('is currently winning state', () => {
    userStore.getState().newGame(Array(2).fill('hello'));
    const answer = userStore.getState().answer;
    userStore.getState().addGuess(answer);
    render(<App />)
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  })

  it('can start a new game', () => {
    userStore.getState().newGame(Array(6).fill('hello'));
    render(<App />)
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    userEvent.click(
      screen.getByText('Restart')
    );
  })


})