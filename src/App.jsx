import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './Die'

function App() {

  const [dice, setDice] = useState(genNumbers())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  // function genNewDice() {
  //   return {
  //     id: nanoid(),
  //     value: Math.ceil(Math.random() * 6),
  //     isHeld: false
  //   }
  // }

  function genNumbers() {
    let array = []
    for (let i = 0; i < 10; i++) {
      array.push(
        {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        }
      )
    }
    return array
  }

  function newNumbers() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(prevDice =>
        prevDice.isHeld ? prevDice : { ...prevDice, value: Math.ceil(Math.random() * 6) }
      ))
    } else {
      setDice(genNumbers())
      setTenzies(false)
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(prevDice =>
      prevDice.id === id ? { ...prevDice, isHeld: !prevDice.isHeld } : prevDice
    ))
  }

  const diceElements = dice.map(
    (die) => (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    )
  )

  return (
    <main>
      {tenzies && <Confetti />}
      <div className='header'>
        <span className='header--titel'>Tenzies</span>
        <span className='header--text'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </span>
      </div>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={newNumbers}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}

export default App
