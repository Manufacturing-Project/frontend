import React from 'react';
import { Box, Button } from '@mui/material';
import { StyledContainerBox , StyledItemDisplayBox  , StyleButtonBox , StyleItemName , StyledDeleteButton , StyledEditButton} from './ItemDisplayBox.styled';
import { ItemboxProps , Item } from '../../../utils/types/molecules/props/itemBoxProps';

const Itembox: React.FC<ItemboxProps> = ({
  items,
  onUpdate,
  onDelete
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
    <StyledContainerBox>
      {items.map((item) => 
        <StyledItemDisplayBox
          key={item.id}
        >
          {editItemId === item.id ? (
            <>
              <input
                type="text"
                value={editItemName}
                onChange={(e) => setEditItemName(e.target.value)}
                placeholder="Edit item name"
              />
              <StyleButtonBox>
              <Button  onClick={() => handleUpdate(item)}>
                Save
              </Button>
              <Button onClick={() => setEditItemId(null)}>Cancel</Button>
              </StyleButtonBox>
              

            </>
          ) : (
            <>
              <StyleItemName>{item.name}</StyleItemName> 
              <Box>
                <Button onClick={() => handleEditClick(item)}>
                 <StyledEditButton />
                </Button>
                <Button onClick={() => handleDeleteClick(item)}>
                  <StyledDeleteButton />
                </Button>
              </Box>
            </>
          )}

          
        </StyledItemDisplayBox>
      )}
    </StyledContainerBox>
  );
};

export { Itembox };
