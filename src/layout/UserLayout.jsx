import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from '../components/Footer';
import NavbarHeader from '../components/NavbarHeader';


const UserLayout = () => {
    return (
        <React.Fragment>
            <div className='container'>
                <NavbarHeader />
                <div className="content">
                    <div className="content-body">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default UserLayout