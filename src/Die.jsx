import React from "react"

export default function Die(props) {

    const style = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }

    return (
        <div
            style={style}
            className="die-face"
            onClick={props.holdDice}
        >
            {props.value}
        </div>
    )
}