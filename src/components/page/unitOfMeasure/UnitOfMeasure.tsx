import * as React from 'react';
import { Itembox } from '../../atoms/itembox/Itembox'; // Adjust the import path as needed
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

 const UnitOfMeasure: React.FC = () => {
  const [units, setUnits] = React.useState<string[]>(['Kilogram', 'Liter', 'Piece', 'Meter', 'Box', 'Packet']);
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [newUnit, setNewUnit] = React.useState<string>('');

  const handleAddUnitClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewUnit('');
  };

  const handleSave = () => {
    if (newUnit.trim()) {
      setUnits([...units, newUnit.trim()]);
      handleDialogClose();
    }
  };

  return (
    <div>

    <Box sx={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
    <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
    </Box>
    <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
    <h1>Unit of Meaasure</h1>
        <Box sx={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleAddUnitClick}>
          Add New Unit
      </Button>

      </Box> 
      <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
      <Itembox
        items={units}
        backgroundColor="#f9f9f9"
        color="#333"
        width="400px"
        height="250px"
        rowPadding="12px"
        onItemClick={(item) => console.log(`Clicked on ${item}`)}
      />
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Unit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Unit"
            type="text"
            fullWidth
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
      </Box>
      </Box>
    <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
    </Box>
    </Box>
    </div>
  );
};
export {UnitOfMeasure};