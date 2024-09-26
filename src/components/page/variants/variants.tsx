import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Itembox } from '../../atoms/itembox/Itembox'; // Adjust the import path as needed
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { setunitName } from '../../../features/units/UnitSlice'; // Redux action to update local store
import { useCreateUnitMutation, useGetUnitsQuery } from '../../../features/units/UnitsApiSlice'; // API hooks

const Variants: React.FC = () => {
  const dispatch = useDispatch();

  // Fetch units from the API and trigger re-fetching after updates
  const { data: units = [], refetch } = useGetUnitsQuery(); // Fetch from MongoDB
  const [createUnit] = useCreateUnitMutation(); // Hook to create a unit

  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [newUnit, setNewUnit] = React.useState<string>('');

  const handleAddUnitClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewUnit('');
  };

  const handleSave = async () => {
    try {
      if (newUnit.trim()) {
        // Update Redux store locally
        dispatch(setunitName(newUnit.trim()));
  
        // Save to MongoDB
        const response = await createUnit({
          unitName: newUnit.trim(),
          _id: undefined
        }).unwrap();
        console.log("Unit created successfully:", response);
  
        // Refetch units after adding the new unit
        refetch();
  
        // Close the dialog
        handleDialogClose();
      }
    } catch (error) {
      console.error("Error creating unit:", error);
    }
  };
  

  return (
    <div>
      <Box sx={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}></Box>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
          <h1>Variants</h1>
          <Box sx={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
            <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
              <Button variant="contained" color="primary" onClick={handleAddUnitClick}>
                Add New Variant
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
              <Itembox
                items={units.map((unit) => unit.unitName)} // Displaying units from MongoDB
                backgroundColor="#f9f9f9"
                color="#333"
                width="400px"
                height="250px"
                rowPadding="12px"
                onItemClick={(item) => console.log(`Clicked on ${item}`)}
              />
              <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Add New Variant</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Variant Name"
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
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}></Box>
      </Box>
    </div>
  );
};

export { Variants };
