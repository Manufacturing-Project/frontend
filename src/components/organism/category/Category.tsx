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
import { Box } from '@mui/material';
import { useCreateCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../../features/categories/CategoryApiSlice'; // API hooks
import Toaster, { ToasterRef } from '../../molecules/toaster/Toaster';
import theme from '../../theme';
import EmptyInfoBox from '../../molecules/emptyInfoBox/EmptyInfoBox';

const Category: React.FC = () => {
  const dispatch = useDispatch();

  type Option = {
    id: string;
    name: string;
  };

  // Fetch categories from the API
  const { data: categories = [], refetch } = useGetCategoriesQuery(); // Fetch from MongoDB
  const [createCategory] = useCreateCategoryMutation(); // Hook to create a category
  const [updateCategory] = useUpdateCategoryMutation(); // Hook to update a category
  const [deleteCategory] = useDeleteCategoryMutation(); // Hook to delete a category

  const categoryOptions: Option[] = categories.map((category: any) => ({
    id: category._id,
    name: category.name,    
  }));

  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [newCategory, setNewCategory] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<Option | null>(null);
  const toasterRef = useRef<ToasterRef>(null);

  const handleAddCategoryClick = () => {
    setSelectedCategory(null); // Reset for new category
    setNewCategory('');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewCategory('');
    setSelectedCategory(null);
  };

  const handleSave = async () => {
    try {
      const trimmedCategory = newCategory.trim();
      if (!trimmedCategory) {
        toasterRef.current?.showToast('Category name cannot be empty!', 'error');
        return;
      }

      // Check for duplicates in the existing categories
      const existingCategories = await refetch();
      const isDuplicate = existingCategories.data?.some((category) => category.name === trimmedCategory);

      if (isDuplicate) {
        toasterRef.current?.showToast('Category name already exists!', 'error');
        return;
      }

      // Check if we're updating or creating a new category
      if (selectedCategory) {
        // Update existing category
        await updateCategory({
          id: selectedCategory.id,
          category: { name: trimmedCategory },
        }).unwrap();
        toasterRef.current?.showToast('Category updated successfully!', 'success');
      } else {
        // Create new category
        await createCategory({ name: trimmedCategory }).unwrap();
        toasterRef.current?.showToast('Category created successfully!', 'success');
      }

      // Refetch categories after adding or updating
      refetch();
      handleDialogClose(); // Close the dialog
    } catch (error) {
      console.error("Error saving category:", error);
      toasterRef.current?.showToast('Error saving category!', 'error');
    }
  };

  const handleUpdate = async (id: string, updatedName: string) => {
    try {
      // Update the category
      await updateCategory({
        id,
        category: { name: updatedName }, // Assuming the API expects an object with 'name'
      }).unwrap();
  
      // Refetch categories after updating
      refetch();
  
      // Show success toast notification
      toasterRef.current?.showToast('Category updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating category:", error);
  
      // Show error toast notification
      toasterRef.current?.showToast('Error updating category!', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      refetch(); // Refetch categories after deleting
      toasterRef.current?.showToast('Category deleted successfully!', 'success');
    } catch (error) {
      console.error("Error deleting category:", error);
      toasterRef.current?.showToast('Error deleting category!', 'error');
    }
  };

  return (
    <div>
      <Box sx={{ height: '100%', background: theme.colors.secondary_background_color  }}>
         <Box sx ={{marginLeft: '60px' , paddingTop: '40px'}}><h1>Category</h1></Box>
            
            <Box sx={{ paddingLeft: '80px' , marginTop:'40px'}}>
            { categoryOptions.length > 0 ? (
                <Itembox
                items={categoryOptions} // Displaying categories from MongoDB
                backgroundColor="#f9f9f9"
                color="#333"
                width="1000px"
                height="250px"
                rowPadding="12px"
                onUpdate={handleUpdate} // Pass the handleUpdate function
                onDelete={handleDelete} // Pass the handleDelete function
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" // Added box shadow here
              /> ) : EmptyInfoBox({ // Display EmptyInfoBox if there are no categories
                text: 'No unit of measures have been added yet',
                buttonText: 'Add New Category',
                onButtonClick: handleAddCategoryClick,
              })} 
              <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{selectedCategory ? 'Update Category' : 'Add New Category'}</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Category"
                    type="text"
                    fullWidth
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
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
             { categoryOptions.length > 0 ? (
               <Button 
               variant="contained" 
               onClick={handleAddCategoryClick}
               sx={{ backgroundColor: theme.colors.button_background_setting, color: theme.colors.font_color_button ,marginTop:'40px'}} >
               Add New Category
             </Button> ) : null }
            </Box>
        </Box>
      
      {/* Toaster should be placed outside of the dialog */}
      <Toaster ref={toasterRef} duration={3000} />
    </div>
  );
};

export { Category };
