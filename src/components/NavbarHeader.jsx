import React, { useRef } from 'react'
import MyBreadcrums from './MyBreadcrums'
import ReorderIcon from '@mui/icons-material/Reorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/user/userSlice';

const NavbarHeader = props => {
    let dispatch = useDispatch()

    const userValue = useSelector(state => state.userState.value)
    const role = useSelector(state => state.userState.user ? state.userState.user.role : "")
    const menuRef = useRef(null);
    const iconRef = useRef(null);

    const closeSideMenu = () => {
        let valid = document.activeElement.id ? document.activeElement.id : ""
        if (!(valid === "navbaricon")) {
            menuRef.current.classList.remove('active')
            iconRef.current.classList.remove('active')
            window.removeEventListener('click', closeSideMenu)
        }
        else {
            window.removeEventListener('click', closeSideMenu)
        }
    }

    const menuToggle = () => {
        menuRef.current.classList.toggle('active')
        iconRef.current.classList.toggle('active')
        window.addEventListener('click', closeSideMenu)
    }
    return (
        <div className='navbarheader'>

            <div className="navbarheader-navbar">

                <div className="navbarheader-navbar-icon" onClick={menuToggle} ref={iconRef} >
                    <input id='navbaricon' type="text" style={{ width: "100%", height: "100%", position: "absolute", display: "", opacity: "0", cursor: "pointer" }} />
                    <ReorderIcon />
                </div>
                <div className="navbarheader-navbar-bread">
                    <MyBreadcrums />

                </div>
            </div>

            <div className="navbarheader-side">
                <div className="navbarheader-side-sidemenu" ref={menuRef}>
                    <div className="navbarheader-side-sidemenu-header">
                        <div className="navbarheader-side-sidemenu-header-item bold">
                            <div>
                                <Avatar alt="Avatar" variant='rounded' src={userValue.avatar ? userValue.avatar : ""}> {userValue.fullname ? userValue.fullname.charAt(0) : "User"}</Avatar>
                            </div>
                            {userValue.fullname ? userValue.fullname : "User"}
                        </div>
                        <div className="navbarheader-side-sidemenu-header-item">
                            <Link to={"/profile"}>
                                <SettingsIcon style={{ width: "24px" }} />
                                Profile Settings
                            </Link>

                        </div>
                        <div className="navbarheader-side-sidemenu-header-item" >
                            <Link to={"/login"} onClick={() => { dispatch(logout()) }}>
                                <LogoutIcon />
                                Log Out
                            </Link>
                        </div>
                    </div>
                    <div className="divider">

                    </div>
                    <div className="navbarheader-side-sidemenu-body">
                        {
                            role === "admin" ?
                                <div className="navbarheader-side-sidemenu-body-item">
                                    <Link to={"/admin"}>
                                        Dashboard
                                    </Link>
                                </div>
                                :
                                role === "mod" ?
                                    <div className="navbarheader-side-sidemenu-body-item">
                                        <Link to={"/courses"}>
                                            Courses
                                        </Link>
                                    </div>
                                    :
                                    <div className="navbarheader-side-sidemenu-body-item">
                                        <Link to={"/courses"}>
                                            Courses
                                        </Link>
                                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

NavbarHeader.propTypes = {

}

export default NavbarHeader
