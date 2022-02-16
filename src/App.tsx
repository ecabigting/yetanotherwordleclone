import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='mx-auto'>
      <h1 className='text-6xl text-center'>YetAnotherWordleClone</h1>
    </div>
  )
}

export default App
