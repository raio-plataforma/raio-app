import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CheckMaterial from '@material-ui/core/Checkbox'
import Checkbox from './Checkbox'

const FormCheck = ({ name, value, register, label, onChange, color }) => {
  const compColor = color || 'primary'
  return (
  <FormControlLabel
    control={<CheckMaterial
      checked={value} 
      color={compColor}
      onChange={onChange} 
      inputRef={register}
      name={name} />
    }
    label={label}
  />
)}

export { FormCheck }
export default Checkbox