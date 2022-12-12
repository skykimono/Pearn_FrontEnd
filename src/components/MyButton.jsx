import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

const MyButton = props => {

    return (
        <Button
            type={props.type ? props.type : ''}
            fullWidth={props.fullWidth ? true : false}
            size={props.size ? props.size : ''}
            onClick={props.onclick ? () => props.onclick() : null}

        >
            {
                props.children
            }
        </Button>
    )
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
    // icon: PropTypes.string,
    // animate: PropTypes.bool,
    onclick: PropTypes.func,
    fullWidth: PropTypes.bool
}

export default MyButton