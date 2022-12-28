import React from 'react'
import PropTypes from 'prop-types'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const DataGridOptions = props => {

    return (
        <button>
            <div className="gridoption" onClick={props.click ? props.click : null}>
                <MoreHorizIcon />
            </div>
        </button>

    )
}
DataGridOptions.propTypes = {
    click: PropTypes.func
}
export default DataGridOptions
