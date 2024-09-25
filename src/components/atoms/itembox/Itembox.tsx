import * as React from 'react';
import Box from '@mui/material/Box';
import { Smalldialogbox } from '../smallDialogbox/Smalldialogbox';
import theme from '../../theme';

export interface ItemboxProps {
  items: string[];
  backgroundColor?: string;
  color?: string;
  width?: string;
  height?: string;
  rowPadding?: string;
  onItemClick?: (item: string) => void;
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

  const [selectedUnit, setSelectedUnit] = React.useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleItemClick = (item: string) => {
    setSelectedUnit(item);
    setDialogOpen(true);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = () => {
    console.log(`Deleted ${selectedUnit}`);
    setDialogOpen(false);
  };

  const handleUpdate = (updatedUnit: string) => {
    console.log(`Updated ${selectedUnit} to ${updatedUnit}`);
    setDialogOpen(false);
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
            {item}
          </Box>
        ))}
      </Box>

      {/* The dialog box is rendered here, separate from the ScrollBox */}
      {selectedUnit && (
        <Smalldialogbox
          open={isDialogOpen}
          unit={selectedUnit}
          onClose={handleDialogClose}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};
