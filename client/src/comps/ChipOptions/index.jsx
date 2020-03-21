import React, { useState } from 'react';
import { StyledChips } from './style';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip'

const ChipOptions = ({ register, name, label, error, value }) => {
  const [list, onAddTerm] = useState(value)
  const [txtValue, addValue] = useState('')

  
  const handleAddTerm = (term) => {
    if(!term) return false;

    const newList = list.includes(term) ?
      list.filter(item => item !== term) :
      [...list, term]
      onAddTerm(newList)
      addValue('')
  }

  const handleEnter = (e, term) => {
    if(e === 'Enter')
      handleAddTerm(term)
  }

  return (
    <StyledChips>
      <input
        type="hidden"
        name={name}
        value={list}
        ref={register}
      />
      <FormControl>
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <FilledInput
            id="outlined-adornment-password"
            type='text'
            color="primary"
            value={txtValue}
            error={error}
            onChange={(e) => addValue(e.target.value)}
            onBlur={(e) => addValue(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleAddTerm(txtValue)}
                >
                  <AddCircleIcon color="primary" />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      <div className="chip-group">
        { list &&
          list.map(item => 
          <Chip 
            label={item}
            onDelete={() => handleAddTerm(item)} 
            color="primary" 
            variant="outlined" 
          />)
        }
      </div>
    </StyledChips>
  )
}

export default ChipOptions