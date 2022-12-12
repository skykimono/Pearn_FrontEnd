import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import Avatar from '@mui/material/Avatar';
import DataGridOptions from './DataGridOptions';

const ClassCard = props => {
    const optionClick = props.optionclick ? props.optionclick : null

    return (
        <React.Fragment>           
            <div className='classcard'>
                <div className="classcard-option">
                    <DataGridOptions click={optionClick} />
                </div>
                <div className="classcard-avatar">
                    <Avatar variant='square'>SE100</Avatar>
                </div>
                <div className="classcard-name">
                    Phuong phap phat trien ...
                </div>

            </div>
        </React.Fragment>

    )
}

ClassCard.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    optionclick: PropTypes.func
}

export default ClassCard
