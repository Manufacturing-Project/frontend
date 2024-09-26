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
import { setCategoryName } from '../../../features/categories/CategorySlice'; // Redux action to update local store
import { useCreateCategoryMutation, useGetCategoriesQuery } from '../../../features/categories/CategoryApiSlice'; // API hooks

const Category: React.FC = () => {
  const dispatch = useDispatch();

  type Option = {
    id: string;
    name: string;
  }; 

  // Fetch categories from the API
  const { data: categories, refetch } = useGetCategoriesQuery(); // Fetch from MongoDB
  const [createCategory] = useCreateCategoryMutation(); // Hook to create a category

  const categoryOptions: Option[] = categories
  ? categories.map((category: any) => ({
      id: category._id,
      name: category.name,
    }))
  : [];

  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [newCategory, setNewCategory] = React.useState<string>('');

  const handleAddCategoryClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewCategory('');
  };

  const handleSave = async () => {
    try {
      if (newCategory.trim()) {
        // Update Redux store locally
        dispatch(setCategoryName(newCategory.trim()));

        // Save to MongoDB
        const response = await createCategory({ "name": newCategory.trim() }).unwrap();
        console.log("Category created successfully:", response);

        // Refetch categories after adding the new category
        refetch();
 
        // Close the dialog
        handleDialogClose();
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}></Box>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
          <h1>Category</h1>
          <Box sx={{ display: 'flex', padding: '20px', boxSizing: 'border-box' }}>
            <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
              <Button variant="contained" color="primary" onClick={handleAddCategoryClick}>
                Add New Category
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
              <Itembox
                items={categoryOptions.map((category) => category.name)} // Displaying categories from MongoDB
                backgroundColor="#f9f9f9"
                color="#333" 
                width="400px"
                height="250px"
                rowPadding="12px"
                onItemClick={(item) => console.log(`Clicked on ${item}`)}
              />
              <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Add New Category</DialogTitle>
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
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}></Box>
      </Box>
    </div>
  );
};

export { Category };
