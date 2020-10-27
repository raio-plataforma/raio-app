import React, { useState, useEffect } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import SelectMaterial from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormSelect from '../FormSelect'

const Select = ({ label, register, name, options, value, onChange, error, helperText }) => {
  
  return(
    <FormSelect
    name={name}
    error={error}
    helperText={helperText}
    onChange={onChange}
    options={options}
    register={register}
    label={label}
    value={value}
    />
  )
}

export default Select