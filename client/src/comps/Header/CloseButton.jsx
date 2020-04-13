import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

const CloseButton = ({ onClick, color, isOpened }) => {
  const compColor = color || 'primary'

  return(
    <IconButton
      aria-label="menu"
      onClick={onClick}
    >
      {
        isOpened ?
        <CloseIcon color={compColor} fontSize="large" /> :
        <MenuIcon color={compColor} fontSize="large" />
      }
    </IconButton>
  )
}

export default CloseButton
