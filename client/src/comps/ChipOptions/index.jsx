import React, { useState } from 'react';
import { StyledChips } from './style';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip'

const ChipOptions = ({ register, name, label }) => {
  const [list, onAddTerm] = useState([])
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
        <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
        <Input
          id="standard-adornment-password"
          type="text"
          value={txtValue}
          onChange={(e) => addValue(e.target.value)}
          onKeyPress={(e) => handleEnter(e.key, txtValue)}
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
        />
      </FormControl>
      <div className="chip-group">
        {
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