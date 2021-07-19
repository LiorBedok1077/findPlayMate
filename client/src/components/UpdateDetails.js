import {useEffect, useState} from 'react'
import axios from 'axios'
import Feedback from './Feedback'
import LangPicker from './LangPicker'
import GamePicker from './GamePicker'

const UpdateDetails = () => {
    
    //fetch the current data and put it on the inputs value:
    useEffect(() => {
        const fetchData = async () => {
        const token = localStorage.getItem('token')
        if(!token) {
                alert('Access Denied. Please login.')
                window.location.href = '/'
        } else {
            axios.post(`http://141.226.244.70:5000/auth/getDetails/`, {
                token: token
            })
            .then(res => {
                setCurrentDetails(res.data)
                console.log(res.data)
            }).catch(err => {
                if(err.response.status === 401) {
                    localStorage.removeItem('token')
                    alert('Access Denied. Please login again.')
                    window.location.href = '/';
                }
                else {
                    setFeedbackMsg({
                        type: "error",
                        data: err.response.data
                    })
                }
            })
        }
    }
    fetchData()
}, [])


    //define the states:
    const [currentDetails, setCurrentDetails] = useState({social: {}})
    const [feedbackMsg, setFeedbackMsg] = useState({
        type: "",
        data: ""
    })


    //check if the values written correctly, send to the API, and handle the response:
    const handleSubmit = (e) => {

        e.preventDefault()

        //organize the selected games into one array, and if not choosed, select the older games:
        let selectedGames = [];
        for (let i=0; i<e.target[5].selectedOptions.length; i++) {
            selectedGames.push(e.target[5].selectedOptions[i].value);
        }
        if(selectedGames.length === 0) selectedGames = currentDetails.games
    
        //organize all the data into one object:
        let formData = {
            token: localStorage.getItem('token'),
            email: e.target[0].value,
            password: e.target[2].value,
            username: e.target[1].value,
            age: parseInt(e.target[3].value),
            social: {
                discord: e.target[6].value,
                twitch: e.target[7].value
            },
            games: selectedGames,
            language: e.target[4].value,
            profilePicture: e.target[8].value
        }

        //send the data
        axios.patch('http://141.226.244.70:5000/auth/updateDetails', formData).then((res) => {
            //handle success:
            setFeedbackMsg({
                type: "success",
                data: "Deatails updated succesfuly!"
            })
        }).catch((err) => {
            //handle errors:
            if(err.response.status === 401) {
                localStorage.removeItem('token')
                alert('Access Denied. Please login again.')
                window.location.href = '/';
            } else {
                setFeedbackMsg({
                    type: "error",
                    data: err.response.data
                })
            }
        })
        
    }

    //check if the token property exist. is it exist the jsx render.
    if(!localStorage.getItem('token')) return window.location.href = '/'
    else return(
        <div>
            <h1>Update Details</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" defaultValue={currentDetails.email} placeholder="email"/>
                <input type="text" defaultValue={currentDetails.username} min="6" placeholder="username"/>
                <input type="password" defaultValue={currentDetails.password} min="6" placeholder="password"/>
                <input type="number" defaultValue={currentDetails.age} max="120" min="10" placeholder="age"/>
                <LangPicker defaultValue={currentDetails.language}/>
                <GamePicker/>
                <input type="text" defaultValue={currentDetails.social.discord} required placeholder="Discord Username"/>
                <input type="text" defaultValue={currentDetails.social.twitch} placeholder="Twitch Username"/>
                <input type="text" defaultValue={currentDetails.profilePicture} placeholder="Profile Picture URL"/>
                <input type="submit"/>
                <Feedback type={feedbackMsg.type}>{feedbackMsg.data}</Feedback>
            </form>
        </div>
    )
}

export default UpdateDetails