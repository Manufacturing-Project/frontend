import * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Itembox } from '../../molecules/itembox/Itembox'; // Adjust the import path as needed
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
// import { useCreateSuppliersMutation, useGetsuppliersQuery, useUpdateSuppliersMutation, useDeleteSuppliersMutation } from '../../../features/suppliers/SuppliersApiSlice'; // API hooks
import Toaster, { ToasterRef } from '../../molecules/toaster/Toaster';
import theme from '../../theme';
import EmptyInfoBox from '../../molecules/emptyInfoBox/EmptyInfoBox';

const Suppliers: React.FC = () => {
  const dispatch = useDispatch();
 
  type Option = {
    id: string;
    name: string;
  };

  // Fetch suppliers from the API
//   const { data: suppliers = [], refetch } = useGetsuppliersQuery(); // Fetch from MongoDB
let suppliers: any[] = [];
//   const [createSuppliers] = useCreateSuppliersMutation(); // Hook to create a Suppliers
//   const [updateSuppliers] = useUpdateSuppliersMutation(); // Hook to update a Suppliers
//   const [deleteSuppliers] = useDeleteSuppliersMutation(); // Hook to delete a Suppliers

  const SuppliersOptions: Option[] = suppliers.map((Suppliers: any) => ({
    id: Suppliers._id,
    name: Suppliers.name,    
  }));

  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [newSuppliers, setNewSuppliers] = React.useState<string>('');
  const [selectedSuppliers, setSelectedSuppliers] = React.useState<Option | null>(null);
  const toasterRef = useRef<ToasterRef>(null);

  const handleAddSuppliersClick = () => {
    setSelectedSuppliers(null); // Reset for new Suppliers
    setNewSuppliers('');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewSuppliers('');
    setSelectedSuppliers(null);
  };

  const handleSave = async () => {
    // try {
    //   const trimmedSuppliers = newSuppliers.trim();
    //   if (!trimmedSuppliers) {
    //     toasterRef.current?.showToast('Suppliers name cannot be empty!', 'error');
    //     return;
    //   }

    //   // Check for duplicates in the existing suppliers
    //   const existingsuppliers = await refetch();
    //   const isDuplicate = existingsuppliers.data?.some((Suppliers) => Suppliers.name === trimmedSuppliers);

    //   if (isDuplicate) {
    //     toasterRef.current?.showToast('Suppliers name already exists!', 'error');
    //     return;
    //   }

    //   // Check if we're updating or creating a new Suppliers
    //   if (selectedSuppliers) {
    //     // Update existing Suppliers
    //     await updateSuppliers({
    //       id: selectedSuppliers.id,
    //       Suppliers: { name: trimmedSuppliers },
    //     }).unwrap();
    //     toasterRef.current?.showToast('Suppliers updated successfully!', 'success');
    //   } else {
    //     // Create new Suppliers
    //     await createSuppliers({ name: trimmedSuppliers }).unwrap();
    //     toasterRef.current?.showToast('Suppliers created successfully!', 'success');
    //   }

    //   // Refetch suppliers after adding or updating
    //   refetch();
    //   handleDialogClose(); // Close the dialog
    // } catch (error) {
    //   console.error("Error saving Suppliers:", error);
    //   toasterRef.current?.showToast('Error saving Suppliers!', 'error');
    // }
  };

  const handleUpdate = async (id: string, updatedName: string) => {
    // try {
    //   // Update the Suppliers
    //   await updateSuppliers({
    //     id,
    //     Suppliers: { name: updatedName }, // Assuming the API expects an object with 'name'
    //   }).unwrap();
  
    //   // Refetch suppliers after updating
    //   refetch();
  
    //   // Show success toast notification
    //   toasterRef.current?.showToast('Suppliers updated successfully!', 'success');
    // } catch (error) {
    //   console.error("Error updating Suppliers:", error);
  
    //   // Show error toast notification
    //   toasterRef.current?.showToast('Error updating Suppliers!', 'error');
    // }
  };

  const handleDelete = async (id: string) => {
    // try {
    //   await deleteSuppliers(id).unwrap();
    //   refetch(); // Refetch suppliers after deleting
    //   toasterRef.current?.showToast('Suppliers deleted successfully!', 'success');
    // } catch (error) {
    //   console.error("Error deleting Suppliers:", error);
    //   toasterRef.current?.showToast('Error deleting Suppliers!', 'error');
    // }
  };

  return (
    <div>
      <Box sx={{ height: '100%', background: theme.colors.secondary_background_color  }}>

         <Box sx ={{marginLeft: '60px'}}>
         <Typography variant="h6" sx={{ fontSize: '28px', fontWeight: 500, lineHeight: '32px' }}>
            Suppliers Details
          </Typography>
         </Box>

            
            <Box sx={{ paddingLeft: '80px', paddingTop: '20px'}}>
            { SuppliersOptions.length > 0 ? (
                <Itembox
                items={SuppliersOptions} // Displaying suppliers from MongoDB
                backgroundColor={theme.colors.item_background_color}
                color={theme.colors.emtybox_color}
                height="250px"
                rowPadding="12px"
                onUpdate={handleUpdate} // Pass the handleUpdate function
                onDelete={handleDelete} // Pass the handleDelete function
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" // Added box shadow here
              /> ) : EmptyInfoBox({ // Display EmptyInfoBox if there are no suppliers
                text: 'No suppliers have been added yet',
                buttonText: 'Add New Suppliers',
                onButtonClick: handleAddSuppliersClick,
              })} 
              <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{selectedSuppliers ? 'Update Suppliers' : 'Add New Suppliers'}</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Suppliers"
                    type="text"
                    fullWidth
                    value={newSuppliers}
                    onChange={(e) => setNewSuppliers(e.target.value)}
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

          <Box sx = {{marginTop: '40px' , marginLeft: '60px'}}>

          <Box sx = {{marginLeft: '10px'}}>

             { SuppliersOptions.length > 0 ? (
               <Button 
               variant="contained" 
               onClick={handleAddSuppliersClick}
               sx={{ backgroundColor: theme.colors.primary_color_green, color: theme.colors.secondary_background_color ,marginTop:'40px'}} >
               Add New Suppliers
             </Button> ) : null }
            </Box>
        </Box>
      
      {/* Toaster should be placed outside of the dialog */}
      <Toaster ref={toasterRef} duration={3000} />
      </Box>
    </div>
    
  );
};

export { Suppliers };
