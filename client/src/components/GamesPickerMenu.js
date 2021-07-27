import { useState } from 'react'
//Imports:
import GamesJson from '../Games_json'
import GameBlock from './GameBlock'
import {AiOutlineArrowRight} from 'react-icons/ai'

const GamesPickerMenu = ({showGamesMenu}) => {


    const [Games, setGames] = useState(GamesJson)
    
    // Game list controllers:
    const removeGame = game_name => setChosenGamesList(ChosenGamesList.filter(game => game!==game_name))    // removing a game form the list
    const addGame = game_name => setChosenGamesList([...ChosenGamesList, game_name])                        // adding a game to the list
    console.log(ChosenGamesList);
    
    const searchGame = e => {
        let value = e.target.value
        setGames(GamesJson.filter(game => (game[0].toLowerCase().includes(value.toLowerCase()))))
    }
    return (
        <div className="GamesPickerMenu_wrapper">
            <div className="games_container">
                <div className="games_menu_bar">
                    <button className="input_hidden"></button>
                    <input type="text" placeholder="Enter a Game" onChange={searchGame} style={{borderColor: !Games.length ? '#f44' : '#4ef'}}/>
                    <button id='games_list_leave_btn' onClick={() => showGamesMenu(false)}><AiOutlineArrowRight /></button>
                </div>
                <div className="games_list">
                    {Games.map(game => <GameBlock key={game[0]} game_name={game[0]} game_image={game[1]} removeGame={removeGame} addGame={addGame} GamesList={ChosenGamesList} />)}
                </div>
            </div>
        </div>
    )
}

export default GamesPickerMenu