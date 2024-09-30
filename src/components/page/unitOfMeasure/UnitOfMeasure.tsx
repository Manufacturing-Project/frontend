import * as React from 'react';
import { useRef } from 'react';
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
import Toaster, { ToasterRef } from '../../atoms/toaster/Toaster';

const UnitOfMeasure: React.FC = () => {
  const dispatch = useDispatch();
  
  // Fetch units fromj the API and trigger re-fetching after updates
  const { data: units = [], refetch } = useGetUnitsQuery(); // Fetch from MongoDB
  const [createUnit] = useCreateUnitMutation(); // Hook to create a unit
  
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [newUnit, setNewUnit] = React.useState<string>('');
  const toasterRef = useRef<ToasterRef>(null);

  const handleAddUnitClick = () => {
    setDialogOpen(true);
  };
  
  const unitItems = units
    ? units.map((unit) => ({
        id: unit._id,
        name: unit.unitName,
      }))
    : [];
    
  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewUnit('');
  };

  const handleSave = async () => {
    try {
      const trimmedUnit = newUnit.trim();
      // Fetch the existing units from the state (already fetched from the API)
      const unitAlreadyExists = units.some((unit) => unit.unitName.toLowerCase() === trimmedUnit.toLowerCase());
      // Check if the new unit is an empty string
      if (!trimmedUnit) {
        toasterRef.current?.showToast('Unit name cannot be empty!', 'error');
        return;
      }
      // Check if the unit already exists in the fetched list
      if (unitAlreadyExists) {
        toasterRef.current?.showToast('Unit already exists!', 'error');
        return;
      }
      // If the unit doesn't exist, proceed to create it
      const response = await createUnit({
        unitName: trimmedUnit,
        _id: undefined
      }).unwrap();
      console.log("Unit created successfully:", response);
      dispatch(setunitName(newUnit.trim()));
      // Refetch units after adding the new unit
      refetch();
      // Show success toast message
      toasterRef.current?.showToast('Unit created successfully!', 'success');
      // Close the dialog
      handleDialogClose();
  
    } catch (error: any) {
      console.error("Error creating unit:", error);
      // Show a generic error toast message for other errors
      toasterRef.current?.showToast('Error creating unit!', 'error');
    }
  };
  
  return (
    <div>
      <Box sx={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}></Box>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
          <h1>Unit of Measure</h1>
          <Box sx={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
            <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
              <Button variant="contained" color="primary" onClick={handleAddUnitClick}>
                Add New Unit
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
              <Itembox
                items={unitItems}
                backgroundColor="#f9f9f9"
                color="#333"
                width="400px"
                height="250px"
                rowPadding="12px"
                onItemClick={(unit) => console.log(`Clicked on ${unit}`)}
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
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}></Box>
      </Box>
      
      {/* Toaster should be placed outside of the dialog */}
      <Toaster ref={toasterRef} duration={3000} />
    </div>
  );
};

export { UnitOfMeasure };
