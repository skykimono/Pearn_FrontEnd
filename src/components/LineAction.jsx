import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add';
import CheckBox from "./CheckBox"

const LineAction = props => {
    const checkbox = props.checkbox ? props.checkbox : false
    return (
        <div className='lineaction' onClick={props.click ? props.click : null}>
            <div className="lineaction-icon" >
                {
                    checkbox ?
                        <CheckBox />
                        :
                        <AddIcon />
                }
            </div>
            <div className="lineaction-actionname">
                {props.name}
            </div>
        </div>
    )
}

LineAction.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    checkbox: PropTypes.bool
}

export default LineAction