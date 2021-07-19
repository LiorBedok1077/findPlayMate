import {useState} from 'react'
import axios from 'axios'
import Feedback from './Feedback'
import LangPicker from './LangPicker'

const Register = ({showGamesMenu, setSection}) => {

    const [feedbackMsg, setFeedbackMsg] = useState({
        type: "",
        data: ""
    })


    //check if the values written correctly, send to the API, and handle the response:
    const handleSubmit = (e) => {

        e.preventDefault()

        let selectedGames = [];
        for (let i=0; i<e.target[8].selectedOptions.length; i++) {
            selectedGames.push(e.target[8].selectedOptions[i].value);
        }

const formData = {
    email: e.target[1].value,
    password: e.target[2].value,
    username: e.target[0].value,
    age: parseInt(e.target[3].value),
    social: {
        discord: e.target[6].value,
        twitch: e.target[7].value
    },
    games: selectedGames,
    language: e.target[4].value,
    profilePicture: e.target[5].value


}
console.log(formData)
        //send the data
        axios.post('http://141.226.244.70:5000/auth/register', formData).then((res) => {
            //handle success:
            console.log(res)
            localStorage.setItem('token', res.data.token)
            setFeedbackMsg({
                type: "success",
                data: "Registered succesfuly! please login."
            })
        }).catch((err) => {
            //handle errors:
            setFeedbackMsg({
                type: "error",
                data: err.response.data
            })
        })
        
    }



    return(
        <div className="register_container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input_wrapper">
                    <div className="input_container primaries">
                        <input type="text" min="6" placeholder="Username" required/>
                        <input type="email" placeholder="Email" required/>
                        <input type="password" min="6" placeholder="Password" required/>
                        <input type="number" max="120" min="10" placeholder="Age" required/>
                        <LangPicker/>
                    </div>
                    <div className="input_container secondaries">
                        <input type="text" placeholder="Profile Picture URL"/>
                        <input type="text" required placeholder="Discord Username"/>
                        <input type="text" placeholder="Twitch Username"/>
                        <textarea readOnly placeholder="Games" onClick={() => showGamesMenu(true)} />
                    </div>    
                </div>
                <div className="footer">
                    <i className='fluid_transition_link' onClick={() => setSection('login')} title="Login">Already have an account?</i>
                    <input type="submit" value="Submit"/>
                </div>
                <Feedback type={feedbackMsg.type}>{feedbackMsg.data}</Feedback>
            </form>
        </div>
    )
}

export default Register