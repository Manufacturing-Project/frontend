// src/components/organism/CommonItemPage.tsx
<<<<<<< Updated upstream
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Itembox } from '../../molecules/itembox/Itembox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Toaster, { ToasterRef } from '../../molecules/toaster/Toaster';
import theme from '../../theme';
import EmptyInfoBox from '../../molecules/emptyInfoBox/EmptyInfoBox';

interface CommonItemPageProps {
  title: string;
  items: { id: string; name: string }[];
  buttonName: string;
  createItem: (name: string) => Promise<void>;
  updateItem: (id: string, name: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}
=======
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Itembox } from "../../molecules/itembox/ItemDisplayBox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Toaster, { ToasterRef } from "../../molecules/toaster/Toaster";
import theme from "../../theme";
import EmptyInfoBox from "../../molecules/emptyInfoBox/EmptyInfoBox";
import { Form, Formik } from "formik";
import { itemInitialValues } from "../../../utils/forms/initialStatus/settingsForm/settingFormInitialStatus";
import { itemValidationSchema } from "../../../utils/forms/validationSchemas/settingsForm/settingFormInitialSchema";
import { StyleAddButton , StyleButton ,StyleItemBoxContainer,StyleTextField,StyledContainerBox,StyledTitle,StyledTitleBox } from "./Setting.Styled";
import { CommonItemPageProps } from "../../../utils/types/organism/commonItemPageProps";
>>>>>>> Stashed changes

const Setting: React.FC<CommonItemPageProps> = ({ title, buttonName , items, createItem, updateItem, deleteItem }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [newItem, setNewItem] = React.useState<string>('');
  const [selectedItem, setSelectedItem] = React.useState<{ id: string; name: string } | null>(null);
  const toasterRef = useRef<ToasterRef>(null);

  const handleAddClick = () => {
    setSelectedItem(null); // Reset for new item
    setNewItem('');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewItem('');
    setSelectedItem(null);
  };

  const handleSave = async () => {
    try {
      const trimmedItem = newItem.trim();
      if (!trimmedItem) {
        toasterRef.current?.showToast(`${title} name cannot be empty!`, 'error');
        return;
      }

      // Check for duplicates
      const isDuplicate = items.some((item) => item.name === trimmedItem);
      if (isDuplicate) {
        toasterRef.current?.showToast(`${title} name already exists!`, 'error');
        return;
      }

      if (selectedItem) {
        // Update existing item
        await updateItem(selectedItem.id, trimmedItem);
        toasterRef.current?.showToast(`${title} updated successfully!`, 'success');
      } else {
        // Create new item
        await createItem(trimmedItem);
        toasterRef.current?.showToast(`${title} created successfully!`, 'success');
      }
      
      handleDialogClose();
    } catch (error) {
      console.error(`Error saving ${title.toLowerCase()}:`, error);
      toasterRef.current?.showToast(`Error saving ${title.toLowerCase()}!`, 'error');
    }
  };

  const handleUpdate = async (id: string, updatedName: string) => {
    await updateItem(id, updatedName);
    toasterRef.current?.showToast(`${title} updated successfully!`, 'success');
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    toasterRef.current?.showToast(`${title} deleted successfully!`, 'success');
  };

  return (
    <div>
<<<<<<< Updated upstream
      <Box sx={{ height: '100%', background: theme.colors.secondary_background_color }}>
        <Box sx={{ marginLeft: '60px' }}>
          <Typography variant="h6" sx={{ fontSize: '28px', fontWeight: 500, lineHeight: '32px' }}>
            {title} 
          </Typography>

          {items.length > 0 && (
            <Button
            variant="contained"
            onClick={handleAddClick}
            sx={{
              backgroundColor: theme.colors.primary_color_green,
              color: theme.colors.secondary_background_color,
              marginTop: '20px',
            }}
          >
            Add New {buttonName}
          </Button>
=======
      <StyledContainerBox>
        <StyledTitleBox>
          <StyledTitle>
            {title}
          </StyledTitle>

          {items.length > 0 && (
            <StyleAddButton
              onClick={handleAddClick}>
              Add New {buttonName}
            </StyleAddButton>
>>>>>>> Stashed changes
          )}
        </StyledTitleBox>

<<<<<<< Updated upstream
        <Box sx={{ paddingLeft: '80px', paddingTop: '20px' }}>
          {items.length > 0 ? (
            <Itembox
              items={items}
              color= {theme.colors.emtybox_color}
              height="250px"
              rowPadding="12px"
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
            />
          ) : (
            <EmptyInfoBox
              text={`No ${title.toLowerCase()} have been added yet.`}
              buttonText={`Add New ${title}`}
              onButtonClick={handleAddClick}
            />
          )}
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>{selectedItem ? `Update ${title}` : `Add New ${title}`}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label={title}
                type="text"
                fullWidth
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
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
=======
        <StyleItemBoxContainer>
          {items.length > 0
            ? (
              <Itembox
                items={items}
                color={theme.colors.emtybox_color}
                height="250px"
                rowPadding="12px"
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              />
            )
            : (
              <EmptyInfoBox
                text={`No ${title.toLowerCase()} have been added yet.`}
                buttonText={`Add New ${title}`}
                onButtonClick={handleAddClick}
              />
            )}
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>
              {selectedItem ? `Update ${title}` : `Add New ${title}`}
            </DialogTitle>
            <Formik
            initialValues={selectedItem ? { name: selectedItem.name } : itemInitialValues}
            validationSchema={itemValidationSchema}
            onSubmit={handleSave}
            enableReinitialize
        >
  {({
    values, errors, touched,handleChange, handleBlur, isSubmitting,isValid, dirty,
  }) => (
    <Form>
      <DialogContent>
        <StyleTextField
          autoFocus
          label={title}
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(touched.name && errors.name)}
          helperText={touched.name && errors.name ? errors.name : ''}
        />
      </DialogContent>
      <DialogActions>
        <StyleButton onClick={handleDialogClose} >
          Cancel
        </StyleButton>
        <StyleButton type="submit"   disabled={isSubmitting || !isValid || !dirty} >
          Save
        </StyleButton>
      </DialogActions>
    </Form>
  )}
  </Formik>
>>>>>>> Stashed changes
          </Dialog>
        </StyleItemBoxContainer>
      </StyledContainerBox>
      <Toaster ref={toasterRef} duration={3000} />
    </div>
  );
};

export { Setting };
