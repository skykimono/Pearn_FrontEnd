import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumbs } from '@mui/material/'
import { useLocation, Link, useParams } from "react-router-dom"
import { useAssignedCourses, useCourses } from '../redux/course/hook'
import { findElementById } from '../utils/uitility'
import { useRole } from '../redux/user/hook'
import { useFetchAllBlocks } from '../redux/block/hook'
import { useState } from 'react'
import { useEffect } from 'react'
const MyBreadcrums = props => {
    const { courseId } = useParams("courseId")
  
    const courses = useCourses()
    const assignedcourses = useAssignedCourses()
    const role = useRole()
    const [courseid, setCourseId] = useState("")
    const blocks = useFetchAllBlocks(courseid,courseid)
    const { pathname } = useLocation();
  
    const links = pathname.slice(1, pathname.length).split("/")
    // if (links.includes('courses')) {
    //     if (courses && courses.length > 0) {
    //         let index = links.findIndex(item => item === "courses")
    //         if (index !== -1)
    //             links[index + 1] = findElementById(links[index + 1], courses) ? findElementById(links[index + 1], courses).coursecode : 
    //     }
    // }
    const changeIdtoName = (id) => {

        if (role === "lecturer" || role === "student") {
            let element = findElementById(id, assignedcourses)
            if (element)
                return element.coursecode
            else if (blocks !== "false") {

                let tmp = findElementById(id, blocks)
                if (tmp)
                    return tmp.name
            }
        }
        else if (role === "mod") {
            let element = findElementById(id, courses)
            if (element)
                return element.coursecode
        }
        return ""
    }
    useEffect(() => {
   
        setCourseId(courseId)
    }, [pathname])
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