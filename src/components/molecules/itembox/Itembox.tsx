import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Item {
  id: string;
  name: string;
}



export interface ItemboxProps {
  items: Item[];
  backgroundColor: string;
  color: string;
  width: string;
  height: string;
  rowPadding: string;
  onUpdate: (id: string, updatedName: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  boxShadow?: string;
}

const Itembox: React.FC<ItemboxProps> = ({
  items,
  backgroundColor,
  color,
  width,
  height,
  rowPadding,
  onUpdate,
  onDelete,
  boxShadow
}) => {
  const [editItemId, setEditItemId] = React.useState<string | null>(null);
  const [editItemName, setEditItemName] = React.useState<string>('');

  const handleEditClick = (item: Item) => {
    setEditItemId(item.id);
    setEditItemName(item.name);
  };

  const handleUpdate = async (item: Item) => {
    if (editItemName.trim()) {
      await onUpdate(item.id, editItemName.trim());
      setEditItemId(null);
      setEditItemName('');
    }
  };

  const handleDeleteClick = async (item: Item) => {
    await onDelete(item.id);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor,
        color,
        width,
        height,
        padding: rowPadding,
        overflowY: 'auto',
        boxShadow: boxShadow || 'none',
      }}
    >
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px',
            borderBottom: '1px solid #ccc',
          }}
        >
          {editItemId === item.id ? (
            <>
              <input
                type="text"
                value={editItemName}
                onChange={(e) => setEditItemName(e.target.value)}
                placeholder="Edit item name"
              />
              <Button onClick={() => handleUpdate(item)}>
                Save
              </Button>
              <Button onClick={() => setEditItemId(null)}>Cancel</Button>
            </>
          ) : (
            <>
              <Typography sx={{ fontSize: '20px' }}>{item.name}</Typography> {/* Change the font size here */}
              <Box>
                <Button onClick={() => handleEditClick(item)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDeleteClick(item)}>
                  <DeleteIcon />
                </Button>
              </Box>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export { Itembox };
