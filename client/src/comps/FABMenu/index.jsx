import React from 'react';
import history from '../../history'
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/icons/MoreVert';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles(theme => {
  
  return ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(5),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
})});



export default function FABMenu({ actionButtons }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const toggleMenu = (open) => {
    setOpen(!open);
  };

  const setRoute = (route) => {
    history.push(route)
  }

  

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="Opções"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={() => toggleMenu(open)}
          onOpen={() => toggleMenu(open)}
          open={open}
          direction="left"
        >
          {actionButtons.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setRoute(action.link)}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}
