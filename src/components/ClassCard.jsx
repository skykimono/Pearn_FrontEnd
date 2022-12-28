import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import Avatar from '@mui/material/Avatar';
import DataGridOptions from './DataGridOptions';

const ClassCard = props => {
    const optionClick = props.optionclick ? props.optionclick : null
    const Click = props.click ? props.click : null
    return (
        <React.Fragment>
            <div className='classcard' onClick={Click}>
                {Click ? <></>
                    :
                    <div className="classcard-option">
                        <DataGridOptions click={optionClick} />
                    </div>
                }
                <div className="classcard-avatar" >
                    <Avatar variant='square'>{props.code}</Avatar>
                </div>
                <div className="classcard-name" >
                    {props.name}
                </div>
            </div>
        </React.Fragment>

    )
}

ClassCard.propTypes = {
    name: PropTypes.string,
    optionclick: PropTypes.func,
    click: PropTypes.func,
    code: PropTypes.string
}

export default ClassCard
