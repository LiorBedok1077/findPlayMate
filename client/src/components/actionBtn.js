import loading from '../styles/img/loading.gif'


// Component renders the main button - acts as a button and a profile picture renderer
const ActionBtn = ({isLoggedIn, setSection, section}) => {

    //Return:
    if (isLoggedIn) return (    // >> search btn
        <button className='btn_user_img_loader' onClick={() => setSection('search')}>
            { section === 'search' ? <img alt="loadingGif" src={loading}/> : <h3>Search</h3>  /* << fetch profile pic data here */}
        </button>
    ) 
    else return (               // >> login btn
        <button className='btn_user_img_loader' onClick={() => setSection('login')}>
            <h3>Login</h3>
        </button>
    )
}

export default ActionBtn