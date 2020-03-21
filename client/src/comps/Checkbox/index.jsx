import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '20px 0',
    flexDirection: 'row'
  },
  fieldset: {
    display: 'flex',
    width: '100%'
  },
  label: {
    fontWeight: 'bold',
    fontSize: '18px'
  },
  options: {
    width: '40%',
    margin: 0
  }
}));

export default function CheckboxesGroup({ value, register, name, label, options, error }) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
    ...value
  });

  const handleChange = key => event => setState({ ...state, [key]: !!event.target.checked });

  
   
  console.log(options.length, Object.keys(state).length)
  return (
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend" className={classes.label}>{label}</FormLabel>
        <FormGroup className={classes.root}>
          {
            options.sort().map((opt, index) =>(
              <FormControlLabel
                key={index}
                className={classes.options}
                control={<Checkbox 
                  inputRef={register}
                  color="primary"
                  name={`${name}[${opt}]`}
                  checked={state[opt]} 
                  onChange={handleChange(opt)} 
                />}
                label={opt}
              />
            ))
          }
        </FormGroup>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
  );
}
