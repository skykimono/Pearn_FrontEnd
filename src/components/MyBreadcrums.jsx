import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumbs } from '@mui/material/'
import { useLocation, Link } from "react-router-dom"
import { useCourses } from '../redux/course/hook'
import { findElementById } from '../utils/uitility'
import { useRole } from '../redux/user/hook'
const MyBreadcrums = () => {
  
    const courses = useCourses()
    const role = useRole()
    const { pathname } = useLocation();
  
    const links = pathname.slice(1, pathname.length).split("/")
    const changeIdtoName = (id) => {

        if (role === "lecturer" || role === "student") {
            let element = findElementById(id, courses)
            if (element)
                return element.code
        }
        else if (role === "mod") {
            let element = findElementById(id, courses)
            if (element)
                return element.code
        }
        return ""
    }
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                links.map((item, index, arr) => {
                    return item === "" ? ""
                        : (
                            <Link
                                key={index}
                                to={
                                    arr.reduce((preitem, curitem, index2) => { return index2 <= index ? preitem.concat(`/${curitem}`) : preitem })
                                }
                                underline="none"
                            >
                                {changeIdtoName(item) ? changeIdtoName(item) : item}
                            </Link>
                        )

                })
            }
        </Breadcrumbs>
    )
}

MyBreadcrums.propTypes = {
    link: PropTypes.array
}

export default MyBreadcrums