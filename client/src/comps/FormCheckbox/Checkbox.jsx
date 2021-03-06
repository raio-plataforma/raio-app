import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import { getKeys } from '../../utils/formatter'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: theme.spacing(1),
    flexDirection: 'row'
  },
  group: {
    flexDirection: 'row'
  },
  label: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: 0,
  },
  options: {
    width: '40%',
    margin: 0
  }
}));

export default function CheckboxesGroup({ value, register, name, label, options, error, color }) {
  const classes = useStyles()
  const compColor = color || 'primary'
  const listValues = value && typeof value !== 'undefined' ? value : [] 
  const isArrayObj = parseInt(Object.keys(listValues)[0], 10) !== 0
  const valueList = !isArrayObj ?
    listValues :
    getKeys(listValues).split(', ')
  
  const [state, setState] = React.useState(valueList)

  const handleChange = key => {
    const newState = state.includes(key) ?
      state.filter(item => item !== key) :
      [...state, key]
    setState(newState)
  }

  return (
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend" className={classes.label}>{label}</FormLabel>
        <FormGroup className={classes.group}>
          {
            options.sort().map((opt, index) =>(
              <FormControlLabel
                key={index}
                className={classes.options}
                control={<Checkbox 
                  inputRef={register}
                  color={compColor}
                  name={`${name}[${opt}]`}
                  checked={state.includes(opt)} 
                  onChange={() => handleChange(opt)} 
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
