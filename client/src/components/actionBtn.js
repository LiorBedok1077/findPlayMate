
// Component renders the main button - acts as a button and a profile picture renderer
const ActionBtn = ({isLoggedIn, setSection, section}) => {

    //Return:
    if (isLoggedIn === true) return (    // >> search btn
            <div className='main_action_button search_btn' onClick={() => setSection('search')}>
            </div>
    ) 
    else if (isLoggedIn === false) return (     // >> login btn
            <div className='main_action_button login_btn' onClick={() => setSection('login')}>

            </div>
    )
    else return(
            <div className='main_action_button init_loggedin_data_fetch'>

            </div>
    )   // awaiting fetching data
}

export default ActionBtn