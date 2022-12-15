import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import MyBreadcrums from './MyBreadcrums'
import ReorderIcon from '@mui/icons-material/Reorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useProfile from '../hooks/useProfile';

const NavbarHeader = props => {
    const menuRef = useRef(null);
    const iconRef = useRef(null);
    let navigate = useNavigate();
    const {fullname, role} = useProfile();
    const LogOut = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('rtoken');
        localStorage.removeItem('role');
        navigate('/login');
    }
    const ToProfile = () =>{
        navigate('/profile')
    }
    const closeSideMenu = () => {
        // let valid = iconRef.current.activeElement
        // if (!(valid.value === "gridoption")) {
        //     menuRef.current.classList.remove('active')
        //     iconRef.current.classList.toggle('active')
        // }
        // console.log(valid);
        // window.removeEventListener('click', closeSideMenu)
    }
    const menuToggle = () => {
        menuRef.current.classList.toggle('active')
        iconRef.current.classList.toggle('active')
        // window.addEventListener('click', closeSideMenu)
    }
    return (
        <div className='navbarheader'>
            <div className="navbarheader-navbar">
                <div className="navbarheader-navbar-icon" onClick={menuToggle} ref={iconRef} >
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
                                <Avatar alt="Avatar" variant='rounded' src={require('../asset/pictures/avatar.jpg')} > N</Avatar>
                            </div>
                            {fullname}
                        </div>
                        <div className="navbarheader-side-sidemenu-header-item">
                            <Link to={"/profile"} onClick={ToProfile}>
                                <SettingsIcon style={{ width: "24px" }} />
                                Profile Settings
                            </Link>

                        </div>
                        <div className="navbarheader-side-sidemenu-header-item" >
                            <Link to={"/login"} onClick={LogOut}>
                                <LogoutIcon />
                                Log Out
                            </Link>
                        </div>
                    </div>
                    <div className="divider">

                    </div>
                    <div className="navbarheader-side-sidemenu-body">
                    { role==='admin'&&(
                        <div className="navbarheader-side-sidemenu-body-item">
                            <Link to={"/admin"}>
                                Dashboard
                            </Link>
                        </div>)}
                        {role === 'staff'&&(
                        <div className="navbarheader-side-sidemenu-body-item">
                            <Link to={"/courses"}>
                                Courses
                            </Link>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>

    )
}

NavbarHeader.propTypes = {

}

export default NavbarHeader
