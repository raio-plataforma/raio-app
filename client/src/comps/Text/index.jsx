import React from 'react'
import Typography from '@material-ui/core/Typography'

const Text = ({ children, color, size, align, style }) => {
  const compColor = color || 'primary'
  const compSize = size || 'body2'  
  return(
    <Typography
      align={align}
      variant={compSize}
      component={compSize}
      color={compColor}
      style={{...style, display: 'block'}}
    >
      {children}
    </Typography>
  )
}

export default Text