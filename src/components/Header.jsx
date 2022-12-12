import React from 'react'
import PropTypes from 'prop-types'

const Header = props => {
  return (
    <div className='header'>
      <div className="header-logo">
        <img src="https://www.creativefabrica.com/wp-content/uploads/2021/10/23/Cute-Blink-Penguin-Face-Illustration-Graphics-19152654-1.jpg" alt="Pegiun Logo" />
      </div>
      <div className="header-search">Search</div>
      <div className="header-avatar">Avatar</div>
    </div>
  )
}

Header.propTypes = {

}

export default Header
