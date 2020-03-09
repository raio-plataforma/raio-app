import React from 'react'
import CheckMaterial from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

const Checkbox = ({ name, label, options, register, error }) => {
  return(
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {
            options.map(option => (
              <FormControlLabel
                control={
                <CheckMaterial 
                  inputRef={register}
                  color="primary"
                  name={name}
                  value={option}
                />}
                label={option}
              />
            ))
        }
      </FormGroup>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  )
}

export default Checkbox