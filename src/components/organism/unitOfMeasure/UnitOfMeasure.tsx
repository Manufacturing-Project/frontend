import * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Itembox } from '../../molecules'; // Adjust the import path as needed
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { setunitName } from '../../../features/units/UnitSlice'; // Redux action to update local store
import { useCreateUnitMutation, useGetUnitsQuery, useUpdateUnitMutation, useDeleteUnitMutation } from '../../../features/units/UnitsApiSlice'; // API hooks
import Toaster, { ToasterRef } from '../../atoms/toaster/Toaster';
import theme from '../../theme';

const UnitOfMeasure: React.FC = () => {
  const dispatch = useDispatch();
  
  // Fetch units from the API and trigger re-fetching after updates
  const { data: units = [], refetch } = useGetUnitsQuery(); // Fetch from MongoDB
  const [createUnit] = useCreateUnitMutation(); // Hook to create a unit
  const [updateUnit] = useUpdateUnitMutation(); // Hook to update a unit
  const [deleteUnit] = useDeleteUnitMutation(); // Hook to delete a unit

  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [newUnit, setNewUnit] = React.useState<string>('');
  const [selectedUnit, setSelectedUnit] = React.useState<{ id: string; name: string } | null>(null);
  const toasterRef = useRef<ToasterRef>(null);

  const handleAddUnitClick = () => {
    setDialogOpen(true);
  };
  
  const unitItems = units.map((unit) => ({
    id: unit._id,
    name: unit.unitName,
  }));
    
  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewUnit('');
    setSelectedUnit(null); // Reset selected unit
  };

  const handleSave = async () => {
    try {
      const trimmedUnit = newUnit.trim();
      // Check if the new unit is an empty string
      if (!trimmedUnit) {
        toasterRef.current?.showToast('Unit name cannot be empty!', 'error');
        return;
      }
      
      // Check for duplicates in the existing units
      const existingUnits = await refetch(); // Fetch existing units
      const isDuplicate = existingUnits.data?.some((unit) => unit.unitName === trimmedUnit);
  
      if (isDuplicate) {
        toasterRef.current?.showToast('Unit name already exists!', 'error');
        return;
      }
  
      // Create the new unit
      const response = await createUnit({
        unitName: trimmedUnit,
        _id: undefined,
      }).unwrap();
      
      console.log("Unit created successfully:", response);
      dispatch(setunitName(trimmedUnit));
      
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
  

  const handleUpdate = async (id: string, updatedName: string) => {
    try {
      await updateUnit({ id, unit: { _id: id, unitName: updatedName } }).unwrap();
      refetch(); // Refetch units after updating
      toasterRef.current?.showToast('Unit updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating unit:", error);
      toasterRef.current?.showToast('Error updating unit!', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUnit(id).unwrap();
      refetch(); // Refetch units after deleting
      toasterRef.current?.showToast('Unit deleted successfully!', 'success');
    } catch (error) {
      console.error("Error deleting unit:", error);
      toasterRef.current?.showToast('Error deleting unit!', 'error');
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', height: '100%', boxSizing: 'border-box', marginTop: '100px' , background: theme.colors.background_color  } }>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}></Box>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
          <h1>Unit of Measure</h1>
          <Box sx={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
            <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
              <Button 
                variant="contained" 
                onClick={handleAddUnitClick}
                sx={{ backgroundColor: theme.colors.button_background_main, color: theme.colors.font_color_button ,marginTop:'100px'}} >
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
                onUpdate={handleUpdate}
                onDelete={handleDelete}
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
