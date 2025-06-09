import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,

  Grid,
} from '@mui/material';
import { StyleTextField, StyleButton } from './EditTableBox.styled';
import { EditDialogBoxProps } from '../../../utils/types/molecules/props/editDialogBoxProps';

  Button,
  Grid,
} from '@mui/material';

interface FieldConfig {
  label: string;
  name: string;
}

interface EditDialogBoxProps {
  open: boolean;
  onClose: () => void;
  initialData: Record<string, any>;
  fields: FieldConfig[];
  onSave: (updatedData: Record<string, any>) => void;
  title?: string;
}

const EditDialogBox: React.FC<EditDialogBoxProps> = ({
  open,
  onClose,
  initialData,
  fields,
  onSave,
  title = 'Edit Item',
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const handleClose = () => {
    onClose();}



  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          {fields.map((field) => (
            <Grid item xs={12} key={field.name}>

              <StyleTextField

              <TextField
                fullWidth

                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>

       <StyleButton onClick={handleClose}>Cancel</StyleButton>
        <StyleButton onClick={handleSubmit}>Save</StyleButton>

        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Save</Button>

      </DialogActions>
    </Dialog>
  );
};

export default EditDialogBox;
