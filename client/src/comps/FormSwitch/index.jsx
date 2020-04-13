import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)+ ' 0',
  },
}));

const FormSwitch = ({ name, value, register, label, onChange, color }) => {
  const compColor = color || 'primary'
  const classes = useStyles()

  return (
  <FormControlLabel
    className={classes.margin}
    control={<Switch 
      checked={value} 
      color={compColor}
      onChange={onChange} 
      inputRef={register}
      name={name} />
    }
    label={label}
  />
)}

export default FormSwitch