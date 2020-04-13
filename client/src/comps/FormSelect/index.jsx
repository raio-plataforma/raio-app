import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import SelectMaterial from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)+ ' 0',
  },
}));

const FormSelect = ({ label, register, name, options, value, onChange, error, color }) => {
  const [ opt, setOpt ] = useState(value)
  const compColor = color || 'primary'
  const classes = useStyles();
  const handleChange = value => {
    setOpt(value)
    if(onChange)
      onChange(value)
  }
  
  return(
    <FormControl  className={classes.margin} fullWidth>
      <InputLabel htmlFor="self_declaration">{label}</InputLabel>
      <SelectMaterial
        native
        inputRef={register}
        defaultValue={opt}
        color={compColor}
        variant="filled"
        onChange={(e) => handleChange(e.target.value)}
        inputProps={{
          name: name,
        }}
      >
        <option value="" />
        {
          options.map((option, index) => {
            return option.value ?
              <option key={index} value={option.value}>{option.name}</option> :
              <option key={index} value={option}>{option}</option>
          })
        }
      </SelectMaterial>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  )
}

export default FormSelect