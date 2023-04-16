import { useState } from 'react'
import Die from './Die'

function App() {

  /**
 * Challenge:
 * 
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `allNewDice` function so it 
 * loads all new dice as soon as the app loads)
 * 
 * Map over the state numbers array to generate our array
 * of Die elements and render those in place of our
 * manually-written 10 Die elements.
 */

  const [dice, setDice] = useState(genNumbers())

  function genNumbers() {
    let array = []
    for (let i = 0; i < 10; i++) {
      array.push(Math.ceil(Math.random() * 6))
    }
    return array
  }

  function newNumbers() {
    setDice(genNumbers())
  }

  const diceElements = dice.map((die) => <Die value={die} />)

  return (
    <main>
      <div className='header'>
        <span className='header--titel'>Tenzies</span>
        <span className='header--text'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </span>
      </div>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={newNumbers}>Roll</button>
    </main>
  )
}

export default App
