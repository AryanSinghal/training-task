import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const SortStatsDialog = (props) => {
  const { open, onClose } = props;
  return (
    <Dialog fullWidth open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Sort Stats</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          Enter Your Trainee Details
        </DialogContentText> */}



      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  );
}

export default SortStatsDialog;
