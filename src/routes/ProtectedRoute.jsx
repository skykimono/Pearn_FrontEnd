import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import MySnackbar from '../components/MySnackbar'
import NavbarHeader from '../components/NavbarHeader'
import { useFetchUser } from '../redux/user/hook'

const ProtectedRoute = () => {
    useFetchUser()
    const userState = useSelector(state => state.userState)

    return (
        userState.user ?
            <React.Fragment>
                <div className='container'>
                    <NavbarHeader />
                    <div className="content">
                        <div className="content-body">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <MySnackbar />
            </React.Fragment>
            :
            <Navigate to='/login'  />
    )
}

export default ProtectedRoute