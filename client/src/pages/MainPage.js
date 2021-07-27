import { useEffect, useState } from 'react'
import axios from 'axios'
//Imports:
import ActionBtn from '../components/actionBtn'
import Login from '../components/Login'
import Register from '../components/Register'
import UserOptions from '../components/UserOptions'


// Component renders the main page
const MainPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null) // boolean => based on loken
    const [userData, setUserData] = useState({})
    const [section, setSection] = useState("")          // section mode - resulting dynamic changes on page (search, login, etc.)

    // render components based on section mode status
    const sectionComponent = {
        login: <Login setSection={setSection}/>,
        register: <Register setSection={setSection}/>,
    }

    // main container classes - based on section mode status
    const mainSectionMode = {
        search: "line_section_div_search",
        register: "line_section_div_register",
        login: "line_section_div_login"
    }
    
    //Checks if the user has a token. If so, try to get the data from the API.
    useEffect(() => {
        const fetchData = async () => {
            axios.post('http://141.226.244.70:5000/auth/getDetails', {token: localStorage.getItem('token')})
            .then(res => {
                console.log(res.data)
                setIsLoggedIn(true)
                setUserData(res.data)
            }).catch(err => {
                setIsLoggedIn(false)
            })
        }
        if(localStorage.getItem('token')) fetchData()
        else setIsLoggedIn(false)
    }, [])

    return(
        <div className="mainPage">
            { isLoggedIn ? <UserOptions profilePicture={userData.profilePicture} username={userData.username}/> : ''}
            <div className={`line_section_div ${mainSectionMode[section] || ""}`}>
                <div className='main_content_section'>
                    <span>Find your allies <br/> for every game you<br/> want.</span>
                    <ActionBtn isLoggedIn={isLoggedIn} setSection={setSection} section={section}/>
                </div>
                { sectionComponent[section] || ""}
            </div>
        </div>
    )
}

export default MainPage