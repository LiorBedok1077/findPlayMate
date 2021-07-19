import { useState } from 'react'
//imports:
import ActionBtn from '../components/actionBtn'
import Login from '../components/Login'
import Register from '../components/Register'
import GamesPickerMenu from '../components/GamesPickerMenu'

const mainSectionMode = {
    search: "line_section_div_search",
    register: "line_section_div_register",
    login: "line_section_div_login"
}


// Component renders the main page
const MainPage = () => {
    
    const [gamesMenu, showGamesMenu] = useState(false)  // Register >> GamesPicker >> GamesPickerMenu
    const [isLoggedIn, setIsLoggedIn] = useState(false) // new Date().getSeconds() % 2 == 0
    const [section, setSection] = useState("")
    const sectionComponent = {
        login: <Login setSection={setSection}/>,
        register: <Register setSection={setSection} showGamesMenu={showGamesMenu}/>,
    }
    
    return(
        <div className="mainPage">
            <div className={`line_section_div ${mainSectionMode[section] || ""}`}>
                <div className='main_content_section'>
                    <span>Find your allies <br/> for every game you<br/> want.</span>
                    <ActionBtn isLoggedIn={isLoggedIn} setSection={setSection} section={section}/>
                </div>
                { sectionComponent[section] || ""}
            </div>
            {gamesMenu ? <GamesPickerMenu /> : ""}
        </div>
    )
}

export default MainPage