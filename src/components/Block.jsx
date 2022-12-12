import React from 'react'
import PropTypes from 'prop-types'

const Block = props => {
    const block = props.padding ? props.padding : ''
    return (
        <div className='block' style={{ padding: `${block}` }}>
            {
                props.children
            }
        </div>
    )
}

Block.propTypes = {
    padding: PropTypes.string
}

export default Block