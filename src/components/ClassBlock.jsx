import React from 'react'
import PropTypes from 'prop-types'
import DataGridOptions from './DataGridOptions';
import ArticleIcon from '@mui/icons-material/Article';
const ClassBlock = props => {
    const optionClick = props.click ? props.click : null
    return (
        <div className="datagrid">
            <div className='classblock'>
                <div className="classblock-icon">
                    <ArticleIcon />
                </div>
                <div className="classblock-name">
                    {props.name}
                </div>
                <div className="classblock-option">
                    <DataGridOptions click={optionClick} />
                </div>

            </div>
        </div>

    )
}

ClassBlock.propTypes = {
    name: PropTypes.string,
    click: PropTypes.func
}

export default ClassBlock
