import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@mui/material'
const MyAlert = props => {
    useEffect(() => {
        let timer = setTimeout(() => {
            props.close()
        }, 2000)
        return () => {
            clearTimeout(timer);
        }
    }, [])
    return (
        <Alert severity={props.type}>{props.message}</Alert>
    )
}

MyAlert.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    close: PropTypes.func
}

export default MyAlert
