import React, { useState } from 'react'
import styled from 'styled-components'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import Typography from '@material-ui/core/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Text from './Text'

const StyledRadio = styled.label`
  display: flex;
  align-items: center;
  color: #FFFF;
  font-weight: 500;
`

const StyledDescription = styled.label`
  color: #fc9b44;
  font-weight: 500;
`
const Input = styled.input`
  margin-right: 10px;
`

const Wrapper = styled.div`
  display: flex;
`

const InputLabel = styled(Text)`
  text-transform: capitalize;
`

const Radios = ({ label, error, onChange, name, defaultValue }) => {
  const checkedVal = defaultValue ? 'sim' : 'não' 
  const [radioVal, setRadioVal] = useState(checkedVal)
  const handleRadio = value => {
    setRadioVal(value)
    console.log(value)
    // onChange(value)
  }
  return (
  <div className="field">
    <Typography color="primary" variant="h6">{label}</Typography>
    {/* <Wrapper>
      {['sim', 'não'].map(item => (
        <StyledRadio className="radio" key={uuid()}>
          <Input
            type="radio"
            className={`${error ? "is-danger" : ""}`}
            onChange={onChange}
            value={item}
            name={name}
            checked={item === defaultValue}
          />
          <Typography color="primary">{item}</Typography>
        </StyledRadio>
      ))}
    </Wrapper> */}
    <FormControl component="fieldset">
        <RadioGroup aria-label="gender" name={name} value={radioVal === 'sim'} onChange={(e) => handleRadio(e.target.value)}>
        {['sim', 'não'].map(item => (
          <FormControlLabel value={item}  control={<Radio color="primary" checked={radioVal === item} />} label={item} />
        ))}
        </RadioGroup>
      </FormControl>
    {error &&
      <p className="help is-danger">
        {error}
      </p>
    }
  </div>
)}

export default Radios