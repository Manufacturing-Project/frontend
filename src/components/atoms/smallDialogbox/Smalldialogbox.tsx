import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export interface SmalldialogboxProps {
  open: boolean;
  unit: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (updatedUnit: string) => void;
}

export const Smalldialogbox: React.FC<SmalldialogboxProps> = ({
  open,
  unit,
  onClose,
  onDelete,
  onUpdate,
}) => {
  const [updatedUnit, setUpdatedUnit] = React.useState<string>(unit);
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');

  const handleUpdate = () => {
    onUpdate(updatedUnit);
    setSnackbarMessage('Update successful');
    setSnackbarOpen(true);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    setSnackbarMessage('Delete successful');
    setSnackbarOpen(true);
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update and Delete Unit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Unit Name"
            type="text"
            fullWidth
            value={updatedUnit}
            onChange={(e) => setUpdatedUnit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
