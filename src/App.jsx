import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './Die'

function App() {

  const [dice, setDice] = useState(genNumbers())
  const [tenzies, setTenzies] = useState(false)
  const [counter, setCounter] = useState(0)
  const [timeHighscore, setTimeHighscore] = useState(false)
  const [timer, setTimer] = useState(0)
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    setTimeoutId(timeoutId) //so i can clear it on win
    return () => clearTimeout(timeoutId);
  }, [timer]);


  useEffect(() => {
    // Retrieve timeHighscore from localStorage
    const storedTimeHighscore = localStorage.getItem('timeHighscore')
    const initialTimeHighscore = storedTimeHighscore ? parseInt(storedTimeHighscore) : false
    setTimeHighscore(initialTimeHighscore)
  }, [])

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
      clearTimeout(timeoutId)

      // Update timeHighscore if necessary
      if (!timeHighscore || timer < timeHighscore) {
        localStorage.setItem('timeHighscore', timer)
        setTimeHighscore(timer)
      }
    }
  }, [dice])

  function genNumbers() {
    let array = []
    for (let i = 0; i < 10; i++) {
      array.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return array
  }

  function newNumbers() {
    if (!tenzies) {
      setDice(prevDice =>
        prevDice.map(prevDice =>
          prevDice.isHeld ? prevDice : { ...prevDice, value: Math.ceil(Math.random() * 6) }
        ))
      setCounter(prevCounter => prevCounter + 1)
    } else {
      //New Game
      setDice(genNumbers())
      setTenzies(false)
      setCounter(0)
      setTimer(0)
    }
  }

  function holdDice(id) {
    setDice(prevDice =>
      prevDice.map(prevDice =>
        prevDice.id === id ? { ...prevDice, isHeld: !prevDice.isHeld } : prevDice
      ))
  }

  const diceElements = dice.map(
    die => (
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
        <span className='titel'>Tenzies</span>
        <span className='text'>
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </span>
      </div>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={newNumbers}>
        {tenzies ? 'New Game' : counter > 0 ? `Roll #${counter + 1}` : 'Roll'}
      </button>
      <div className='stats text'>
        <span>Time: {timer}s</span>
        <span>Highscore: {timeHighscore ? `${timeHighscore}s` : 'N/A'}</span>
      </div>
    </main>
  )
}

export default App
