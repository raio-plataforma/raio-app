import React, {useState} from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import SelectMaterial from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

const Select = ({ label, register, name, options, value, onChange, error }) => {
  const [ opt, setOpt ] = useState(value)
  
  const handleChange = value => {
    setOpt(value)
    if(onChange)
      onChange(value)
  }
  
  return(
    <FormControl fullWidth>
      <InputLabel htmlFor="self_declaration">{label}</InputLabel>
      <SelectMaterial
        native
        inputRef={register}
        defaultValue={opt}
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

export default Select