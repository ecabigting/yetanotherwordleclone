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
    userStore.setState({guesses: [], });
    render(<App />)
    expect(screen.queryByText('Game Over!')).toBeNull();
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    expect(document.querySelector('main')?.textContent).toEqual('');
  })

  it('currently shows one row of guesses', () => {
    userStore.setState({guesses: ['hello'], });
    render(<App />)
    expect(document.querySelector('main')?.textContent).toEqual('hello');
  })

  it('currently shows gameover', () => {
    userStore.setState({guesses: Array(6).fill('hello') });
    render(<App />)
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  })

  it('can start a new game', () => {
    userStore.setState({guesses: Array(6).fill('hello') });
    render(<App />)
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    userEvent.click(
      screen.getByText('Restart')
    );
  })


})