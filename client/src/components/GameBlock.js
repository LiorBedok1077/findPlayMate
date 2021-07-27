import { useState } from 'react'

// Game container - every game will be stored as an element
const GameBlock = ({game_name, game_image, removeGame, addGame, GamesList}) => {
    const [isChosen, setIsChosen] = useState(false), changeGameState = () => {
        // Function changes the current state of this game => adding or removing games from the total list
        if (!isChosen) addGame(game_name)
        else removeGame(game_name)
        setIsChosen(!isChosen)
        /** isChosen is not changing (though it's defined by a useState) - affects functionallity */
    }
    return (
        <div className={`game_block ${isChosen ? 'game_block_active' : ''}`} title={game_name} onClick={changeGameState}>
            <img draggable='false' src={game_image} onLoad={e => {e.target.parentElement.style.pointerEvents = 'visible'}}/>
        </div>
    )
}

export default GameBlock