import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import SwitchMaterial from '@material-ui/core/Switch';

export default function Switch({ name, label, error, register}) {
  const [state, setState] = React.useState({
    gilad: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={
            <SwitchMaterial 
            name={name}
            color="primary"
            onChange={handleChange('gilad')} 
            useRef={register}
            value="gilad" />}
          label={label}
        />
      </FormGroup>
        {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}
