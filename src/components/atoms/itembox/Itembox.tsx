import * as React from 'react';
import Box from '@mui/material/Box';
import { Smalldialogbox } from '../smallDialogbox/Smalldialogbox';
import theme from '../../theme';
import { useUpdateUnitMutation, useDeleteUnitMutation  , useGetUnitsQuery} from '../../../features/units/UnitsApiSlice'; // Import mutation hooks
import Toaster, { ToasterRef } from '../../atoms/toaster/Toaster';
import { useRef } from 'react';
export interface ItemboxProps {
  items: { id: string; name: string }[];
  backgroundColor?: string;
  color?: string;
  width?: string;
  height?: string;
  rowPadding?: string;
  onItemClick?: (item: string) => void;
}

export interface CreateUnit {
  _id?: string;
  unitName: string;
}

export const Itembox: React.FC<ItemboxProps> = ({
  items,
  backgroundColor,
  color,
  width = '300px',
  height = '200px',
  rowPadding = '10px',
  onItemClick,
}) => {
  const defaultBackgroundColor = theme.colors.Itembox_background_color || '#fff';
  const defaultFontColor = theme.colors.font_color_button || '#000';

  const [selectedUnit, setSelectedUnit] = React.useState<{ id: string; name: string } | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const toasterRef = useRef<ToasterRef>(null);

  const {  refetch } = useGetUnitsQuery();

  // Use mutation hooks for delete and update
  const [updateUnit] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();

  const handleItemClick = (item: { id: string; name: string }) => {
    setSelectedUnit(item);
    setDialogOpen(true);
    if (onItemClick) {
      onItemClick(item.name); // Ensure the onItemClick prop works if passed
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUnit(null); // Reset selected unit
  };

  const handleDelete = async () => {
    if (selectedUnit) {
      // Call delete mutation with the selected unit
      await deleteUnit(selectedUnit.id);
      console.log(`Deleted ${selectedUnit.name}`);
      toasterRef.current?.showToast('Unit Deleted successfully!', 'success');
      setDialogOpen(false);
      refetch();
      

    }
  };

  const handleUpdate = async (updatedUnitName: string) => {
    if (selectedUnit) {
      // Include the _id in the unit object for update
      await updateUnit({
        id: selectedUnit.id,
        unit: {
          _id: selectedUnit.id,  // Include the _id
          unitName: updatedUnitName,
        },
      }).unwrap();
      console.log(`Updated ${selectedUnit.name} to ${updatedUnitName}`);
      toasterRef.current?.showToast('Unit updated successfully!', 'success');
      setDialogOpen(false);
      refetch();
    }
  };
  

  return (
    <>
      <Box
        sx={{
          backgroundColor: backgroundColor || defaultBackgroundColor,
          color: color || defaultFontColor,
          borderRadius: '4px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          width: width,
          height: height,
          overflowY: 'auto',
          padding: '10px',
          border: `1px solid ${theme.colors.button_background_Logout || '#ccc'}`,
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: rowPadding,
              borderBottom: `1px solid ${theme.colors.button_background_Logout || '#eee'}`,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.colors.button_background_Logout || '#f1f1f1',
              },
            }}
            onClick={() => handleItemClick(item)}
          >
            {item.name}
          </Box>
        ))}
      </Box>

    
      {selectedUnit && (
        <Smalldialogbox
          open={isDialogOpen}
          thing={selectedUnit.name}
          onClose={handleDialogClose}
          onDelete={handleDelete}
          onUpdate={handleUpdate} // Pass handleUpdate to Smalldialogbox
        />
        
      )}
      <Toaster ref={toasterRef} duration={3000} />
    </>
  );
};
