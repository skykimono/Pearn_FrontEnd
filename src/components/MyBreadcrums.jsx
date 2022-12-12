import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumbs } from '@mui/material/'
import { useLocation, Link } from "react-router-dom"
const MyBreadcrums = props => {
    const { pathname } = useLocation();
    const links = pathname.slice(1,pathname.length).split("/")
    console.log(pathname,links);
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                links.map((item, index, arr) => {
                    return item === "" ? ""
                        : (
                            <Link
                                key={index}
                                to={
                                    arr.reduce((preitem,curitem, index2) => {  return index2 <= index ? preitem.concat(`/${curitem}`) : preitem})
                                }
                                underline="none"
                            >
                                {item}
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