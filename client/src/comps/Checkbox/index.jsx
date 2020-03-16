import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckMaterial from '@material-ui/core/Checkbox';



export default function Checkbox({ label, options, name, error, onChange, register }) {
  const [state, setState] = React.useState([]);

  const handleChange = event => {
    setState([...state, event]);
    if(onChange)
      onChange(state)
  };


  return (
    <FormControl component="fieldset" >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {
          options.map((option, index) => {
            return option.value ?
            (<FormControlLabel
              key={index}
              control={<CheckMaterial 
              inputRef={register}
              name={`${name}`}
              onChange={(e) => handleChange(option.value)} value={option.value} />}
              label={option.name}
            />) :
            (<FormControlLabel
              key={index}
              control={<CheckMaterial
              inputRef={register}
              name={`${name}`}
              onChange={(e) => handleChange(option)} value={option} />}
              label={option}
            />)
          })
        }
      </FormGroup>
      <FormHelperText error>{error}</FormHelperText>
    </FormControl>
  );
}
