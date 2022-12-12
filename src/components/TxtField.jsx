import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'

const TxtField = props => {
    return (
        <TextField
            inputProps={{ className: "textField" }}
            InputLabelProps={{ className: "textField" }}
            margin={props.margin ? props.margin : ''}
            required={props.required ? true : false}
            fullWidth={props.fullWidth ? true : false}
            label={props.label ? props.label : ''}
            type={props.type}
            autoFocus={props.autoFocus ? true : false}
            error={props.error ? true : false}
            placeholder={props.placeholder ? props.placeholder : ''}
            size={props.size ? props.size : 'small'}
        />
    )
}

TxtField.propTypes = {
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    error: PropTypes.bool,
    autoFocus: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    margin: PropTypes.string
    
}

export default TxtField