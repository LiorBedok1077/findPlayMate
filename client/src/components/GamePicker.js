import { useState } from "react"
import GamesPickerMenu from "./GamesPickerMenu"

const GamePicker = ({showGamesMenu}) => {
    
    return (
        <textarea readOnly placeholder="Games" onClick={() => showGamesMenu(true)} />
    )
}

export default GamePicker