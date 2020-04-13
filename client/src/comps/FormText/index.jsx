import React from 'react'
import TextField from '@material-ui/core/TextField'

const FormText = ({ name, error, value, register, label, rows, type, onChange }) => (
  <TextField
    name={name}
    type={type}
    fullWidth
    onChange={onChange}
    multiline={rows}
    rows={rows}
    defaultValue={value}
    error={error}
    helperText={error}
    inputRef={register}
    label={label}
    variant="filled"
  />
)

export default FormText