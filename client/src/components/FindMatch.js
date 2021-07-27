import axios from "axios"
import { useEffect, useState } from "react"
import Feedback from "./Feedback"

const FindMatch = ({game}) => {

    const [matchDetails, setMatchDetails] = useState({})
    const [feedbackMsg, setFeedbackMsg] = useState({})

    //fetch the match based on the game and the user language
    useEffect(() => {
        const fetchMatchData = async () => {
            axios.post(`http://141.226.244.70:5000/actions/findMatch/${game}`, {token: localStorage.getItem('token')})
            .then(res => {
                setMatchDetails(res.data)
            }).catch(err => {
                setFeedbackMsg({
                    type: "error",
                    data: err.response.data
                })
            })
        }

        fetchMatchData()
    }, [])

    return (
        <div>
            <Feedback type={feedbackMsg.type}>{feedbackMsg.data}</Feedback>
        </div>
    )
}

export default FindMatch