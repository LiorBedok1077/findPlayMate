import {useState} from 'react'
import axios from 'axios'
import Feedback from './Feedback'

const Login = ({setSection}) => {

    const [feedbackMsg, setFeedbackMsg] = useState({
        type: "",
        data: ""
    })


    //check if the values written correctly, send to the API, and handle the response:
    const handleSubmit = (e) => {

        e.preventDefault()
        
        //values validation:
        if(e.target[1].value.length < 6 || !e.target[0].value.includes(".")) return setFeedbackMsg({
            type: "error",
            data: "The email address or password is not written correctly or empty. try again."
        })

        //send the data
        axios.post('http://141.226.244.70:5000/auth/login', {
            email: e.target[0].value,
            password: e.target[1].value
        }).then((res) => {
            //handle success:
            console.log(res)
            localStorage.setItem('token', res.data.token)
            setFeedbackMsg({
                type: "success",
                data: "Logged in succesfuly!"
            })
            window.location.href = '/';
        }).catch((err) => {
            //handle errors:
            setFeedbackMsg({
                type: "error",
                data: err.response.data
            })
        })
        
    }

    return(
        <div className="login_container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input_wrapper">
                    <input type="email" maxLength='48' required placeholder="Email"/>
                    <input type="password" min="6" maxLength='48' required placeholder="Password"/>
                </div>
                <div className='form_footer'>
                    <i className='fluid_transition_link' onClick={() => setSection('register')} title="Register">Don't have an account?</i>
                    <input type="submit" value='Join Us'/>
                </div>
                <Feedback type={feedbackMsg.type}>{feedbackMsg.data}</Feedback>
            </form>
        </div>
    )
}

export default Login