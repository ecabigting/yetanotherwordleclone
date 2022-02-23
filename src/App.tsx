import WordRow from './WordRow'

export default function App() {

  return (
    <div className='mx-auto w-96'>
      <header className='border-b border-gray-500 pb-2 mb-2 my-2'>
          <h1 className='text-4xl text-center'>YetAnotherWordleClone</h1>
      </header>

      <main className='grid grid-rows-6 gap-4'>
        <WordRow letters="robot"/>
        <WordRow letters="apple"/>
        <WordRow letters="micro"/>
        <WordRow letters="boots"/>
        <WordRow letters="paper"/>
        <WordRow letters="broo"/>
      </main>
    </div>
  )
}
