import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.text.primary,
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography component="h2" variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function Modal({ children, isOpen, onClose, title }) {
  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: '#f7cc94',
            boxShadow: 'none',
          },
        }}
        open={isOpen}>
        { title && <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
      </DialogTitle> }
        <DialogContent dividers>
          { children }
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modal