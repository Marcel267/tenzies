import { useState } from 'react'
import Die from './Die'

function App() {

  return (
    <main>
      <div className='dice-container'>
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
      </div>
    </main>
  )
}

export default App
