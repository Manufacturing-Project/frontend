import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Itembox } from '../../molecules/itembox/Itembox'; // Adjust the import path as needed
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
// import { setVariantName } from '../../../features/Variants/VariantSlice'; // Redux action to update local store
import { useCreateVariantMutation, } from '../../../features/variants/variantApiSlice'; // API hooks
import theme from '../../theme';
import Toaster from '../../molecules/toaster/Toaster';
import { useDeleteVariantMutation, useGetVariantsQuery, useUpdateVariantMutation } from '../../../features/variants/variantApiSlice';
import EmptyInfoBox from '../../molecules/emptyInfoBox/EmptyInfoBox';

const Variants: React.FC = () => { 
  const dispatch = useDispatch();

  // Fetch Variants from the API and trigger re-fetching after updates
  const { data: variants = [], refetch } = useGetVariantsQuery(); // Fetch from MongoDB
  const [createVariant] = useCreateVariantMutation(); // Hook to create a Variant
  const [updateVariant] = useUpdateVariantMutation(); // Hook to update a Variant
  const [deleteVariant] = useDeleteVariantMutation();
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const [newVariant, setNewVariant] = React.useState<string>('');

  const handleAddVariantClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewVariant('');
  };

  const variantsItems = variants.map((variant) => ({
    id: variant._id,
    name: variant.variantName,
  }));

  const handleSave = async () => {
    try {
      if (newVariant.trim()) {
        // Update Redux store locally
        // dispatch(setVariantName(newVariant.trim()));
  
        // Save to MongoDB
        const response = await createVariant({
          variantName: newVariant.trim(),
          _id: undefined 
        }).unwrap();
        console.log("Variant created successfully:", response);
  
        // Refetch Variants after adding the new Variant
        refetch();
  
        // Close the dialog
        handleDialogClose();
      }
    } catch (error) {
      console.error("Error creating Variant:", error);
    }
  };
  
  const handleUpdate = async (id: string, updatedName: string) => {
    try {
      await updateVariant({ id, variant: { _id: id, variantName: updatedName } }).unwrap();
      refetch(); // Refetch Variants after updating
      // toasterRef.current?.showToast('Variant updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating Variant:", error);
      // toasterRef.current?.showToast('Error updating Variant!', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVariant(id).unwrap();
      refetch(); // Refetch units after deleting
      // toasterRef.current?.showToast('Unit deleted successfully!', 'success');
    } catch (error) {
      console.error("Error deleting unit:", error);
      // toasterRef.current?.showToast('Error deleting unit!', 'error');
    }
  };


  return (
    <div> 
    <Box sx={{ height: '100%', marginTop: '100px' , background: theme.colors.secondary_background_color  } }>
       <Box sx ={{marginLeft: '60px' , paddingTop: '25px'}}><h1>Variant Details</h1></Box>
          
          <Box sx={{  paddingLeft: '80px' , marginTop:'40px'}}>
          
          {variantsItems.length > 0 ? (
            <Itembox
              items={variantsItems}
              backgroundColor="#f9f9f9"
              color="#333"
              width="1000px"
              height="250px"
              rowPadding="12px"
              onUpdate={handleUpdate} 
              onDelete={handleDelete}
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" // Added box shadow here
            />
          ) : (
            EmptyInfoBox({
              text: 'No variants have been added yet.',
              buttonText: 'Add New Variant',
              onButtonClick: handleAddVariantClick,
            })
          )} 

            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Add New Variant</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Variant"
                  type="text"
                  fullWidth
                  value={newVariant}
                  onChange={(e) => setNewVariant(e.target.value)}
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
        <Box sx = {{marginTop: '40px' , marginLeft: '10px'}}>
           { variantsItems.length > 0  ?  <Button 
              variant="contained" 
              onClick={handleAddVariantClick}
              sx={{ backgroundColor: theme.colors.button_background_setting, color: theme.colors.font_color_button ,marginTop:'40px'}} >
              Add New Varaints 
            </Button> : null }  
          </Box>
      </Box>
    
    
    {/* Toaster should be placed outside of the dialog */}
    {/* <Toaster ref={toasterRef} duration={3000} /> */}
  </div>
  );
};
 
export { Variants };
