import React, { useState, useEffect } from "react"
import Dice from "./Dice"
import { nanoid } from "nanoid"
import './App.css'
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false);
  const [rollNumber, setRollNumber] = useState(0)
 
  useEffect(() => {
    const allHeld = dice.every(dice => dice.isHeld === true)
    const firstValue = dice[0].value
    const allSameValue = dice.every(dice => dice.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      alert('You won!!')
    }
  }, [dice])

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }

  function rollDice() {
    if(tenzies) {
      setTenzies(false)
      setDice(allNewDice())
      setRollNumber(0)
      console.log("heyeeyyeeyyeey")
    } else {
      setDice(oldDice => oldDice.map(dice => {
        return dice.isHeld ? dice : generateNewDice()
      }))
   
      setRollNumber(numberOfRoll => numberOfRoll+1)
      console.log("number of roll")
    }
    
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(dice => {
      return dice.id === id ?
        { ...dice, isHeld: !dice.isHeld } :
        dice
    }))
  }

  console.log("dice", dice)

  const diceElements = dice.map(dice => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      tellDice={() => holdDice(dice.id)} 
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <h2>Numbers of roll: {rollNumber}</h2>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}