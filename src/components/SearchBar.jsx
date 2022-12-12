import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef, useState, useEffect } from 'react';
const SearchBar = props => {
  const cancelRef = useRef(null)
  const [inputSearch, SetInputSearch] = useState('')

  const onInputChange = (event) => {
    SetInputSearch(event.target.value)

  }

  useEffect(() => {
    if (inputSearch !== "") {
      cancelRef.current.classList.add('show')
    }
    else {
      cancelRef.current.classList.remove('show')
    }

  }, [inputSearch]);
  return (
    <div className="searchbar">
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5,borderRightWidth:2 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search ..."
          onChange={onInputChange}
          value={inputSearch}
          name="inputSearch"
        // inputProps={{ 'aria-label': 'search google maps' }}
        />
        <div className="searchbar-cancel" ref={cancelRef} onClick={() => SetInputSearch('')}>
          <IconButton sx={{ p: '10px' }} >
            <CancelIcon />
          </IconButton>
        </div>

      </Paper>
    </div>
  )
}

SearchBar.propTypes = {
  data: PropTypes.array
}

export default SearchBar
