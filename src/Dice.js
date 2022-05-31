import React from "react"

export default function Dice(props) {
    let diceNum = props.id
    let tellDice = props.tellDice
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
        className="dice-face" 
        style={styles} 
        onClick={tellDice}
        >
            <h2 className="dice-num">{props.value}</h2>
          
        </div>
    )
}