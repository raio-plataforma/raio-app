import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import SelectMaterial from '@material-ui/core/Select'

const Select = ({ name, label, register, options, error, onChange }) => {
  return (
    <FormControl variant="filled" error={error}>
      <InputLabel>{label}</InputLabel>
      <SelectMaterial
        name={name}
        labelId="demo-simple-select-filled-label"
        onChange={onChange}
        inputRef={register}
      >
      { options.map(option => <MenuItem value={option}>{option}</MenuItem>) }
      </SelectMaterial>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default Select