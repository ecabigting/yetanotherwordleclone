import WordRow from './WordRow'

export default function App() {

  return (
    <div className='mx-auto w-2/3'>
      <header className='border-b border-gray-500 pb-2 mb-2 my-2'>
          <h1 className='text-4xl text-center'>YetAnotherWordleClone</h1>
      </header>

      <main>
        <WordRow letters="dude"/>
        <WordRow letters="where"/>
        <WordRow letters="is"/>
        <WordRow letters="my"/>
        <WordRow letters="car"/>
        <WordRow letters="dude"/>
      </main>
    </div>
  )
}
