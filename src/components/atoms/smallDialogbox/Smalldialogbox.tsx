import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export interface SmalldialogboxProps {
  open: boolean;
  thing: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (update: string) => void;
}

export const Smalldialogbox: React.FC<SmalldialogboxProps> = ({
  open,
  thing,
  onClose,
  onDelete,
  onUpdate,
}) => {
  const [update, setUpdate] = React.useState<string>(thing);
  

  const handleUpdate = () => {
    onUpdate(update);
     // Show toast first
    onClose(); // Then close the dialog
  };

  const handleDelete = () => {
    onDelete();
     // Show toast first
    onClose(); // Then close the dialog
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
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
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

      {/* Toaster should stay mounted in the DOM */}
      
    </>
  );
};
