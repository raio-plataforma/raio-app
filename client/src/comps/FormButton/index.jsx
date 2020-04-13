import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const FormButton = ({ type, variant, color, children }) => {
  const compColor = color || 'primary'
  const compVariant = variant || 'contained'
  const classes = useStyles()
  return (
    <Button
      type={type}
      variant={compVariant}
      size="large"
      className={classes.margin}
      color={compColor}>
    {children}
  </Button>
)}

export default FormButton