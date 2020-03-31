import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';



const DialogTitle = props => {
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
};



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
            backgroundColor: '#6f0000',
            boxShadow: 'none',
          },
        }}
        open={isOpen}>
        { title && <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
      </DialogTitle> }
        <MuiDialogContent dividers>
          { children }
        </MuiDialogContent>
      </Dialog>
    </div>
  );
}

export default Modal