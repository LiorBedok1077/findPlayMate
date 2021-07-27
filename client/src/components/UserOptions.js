import { useState } from 'react'
import {BiChevronDown} from 'react-icons/bi'
import loading from '../styles/img/loading.gif'


// component renders the dropdown
const DropDown = () => {


    const handleLogOut = () => {
        localStorage.removeItem('token')
        window.location.href = '/';
    }

    return (
        <div className="useroptions_dropdown">
            <button>Edit Profile</button>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}


const UserOptions = ({username, profilePicture}) => {

    const [dropDown, toggleDropDown] = useState(false)    // dropdown state
    const logOut = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <>
            <div className="UserOptions" onClick={() => toggleDropDown(!dropDown)}>
                <div className="profile u_img">
                    <img src={profilePicture}/>
                </div>
                <div className="profile u_username">
                    <code>{username}</code>
                </div>
                <div className="profile u_expand">
                    <BiChevronDown/>
                </div>
            </div>
            {/* dropdown component */}
            {dropDown ? <DropDown /> : ''}
        </>
    )
}

export default UserOptions