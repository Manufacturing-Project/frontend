import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Typography, 
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { generateVariantCombinations } from './generateFunction';
import theme from '../../../components/theme';
import { useGetUnitsQuery } from '../../../features/units/UnitsApiSlice';

interface TableRowData {
  code: string;
  name: string;
  reorderLevel: number;
  unitOfMeasure: string;
  description: string;
}

interface EditDialogData {
  open: boolean;
  rowIndex: number;
  data: TableRowData | null;
}

interface GeneratedMaterialTableProps {
  onMaterialsChange?: (materials: TableRowData[]) => void;
}


const GeneratedMaterialTable: React.FC<GeneratedMaterialTableProps> = ({ onMaterialsChange }) => {
  const {
    m_name,
    m_code,
    unit,
    reorderlevel,  
    description,
    variants,
  } = useSelector((state: RootState) => state.rawMaterial);

  // Generate variant combinations
  const generatedVariants = variants.length
    ? generateVariantCombinations(m_name, m_code, variants).map(({ code, name }) => ({
        code,
        name,
        reorderLevel: reorderlevel,
        unitOfMeasure: unit,
        description,
      }))
    : [];

    const { data: units } = useGetUnitsQuery();

  // Initialize rows state
  const [rows, setRows] = useState<TableRowData[]>([]);
  const [editDialog, setEditDialog] = useState<EditDialogData>({
    open: false,
    rowIndex: -1,
    data: null
  });

  // Update rows whenever generatedVariants change
  useEffect(() => {
    setRows(generatedVariants);
  }, [generatedVariants]);

  // Notify parent component when materials change
  useEffect(() => {
    if (onMaterialsChange) {
      onMaterialsChange(rows);
    }
  }, [rows, onMaterialsChange]);

  const handleEdit = (rowIndex: number) => {
    setEditDialog({
      open: true,
      rowIndex,
      data: { ...rows[rowIndex] }
    });
  };

  const handleSaveEdit = () => {
    if (editDialog.data && editDialog.rowIndex >= 0) {
      const updatedRows = [...rows];
      updatedRows[editDialog.rowIndex] = editDialog.data;
      setRows(updatedRows);
      setEditDialog({ open: false, rowIndex: -1, data: null });
    }
  };

  const handleCancelEdit = () => {
    setEditDialog({ open: false, rowIndex: -1, data: null });
  };

  const handleEditFieldChange = (field: keyof TableRowData, value: string | number) => {
    if (editDialog.data) {
      setEditDialog(prev => ({
        ...prev,
        data: {
          ...prev.data!,
          [field]: value
        }
      }));
    }
  };

  const getUnitName = (unitId: string): string => {
  return units?.find(u => u._id === unitId)?.unitName || unitId;
};

  const handleDelete = (rowIndex: number) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    setRows(updatedRows);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        paddingLeft: '60px',
        backgroundColor: theme.colors.secondary_background_color,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h4">Generated Materials ({rows.length})</Typography>

      <TableContainer sx={{ maxHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: theme.colors.table_cell_color }}>
                <Typography variant="body1">Code</Typography>
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: theme.colors.table_cell_color }}>
                <Typography variant="body1">Name</Typography>
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: theme.colors.table_cell_color }}>
                <Typography variant="body1">Reorder Level</Typography>
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: theme.colors.table_cell_color }}>
                <Typography variant="body1">Unit of Measure</Typography>
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: theme.colors.table_cell_color }}>
                <Typography variant="body1">Description</Typography>
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: theme.colors.table_cell_color }}>
                <Typography variant="body1">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: 'rgba(33, 150, 243, 0.08)',
                }}
              >
                <TableCell align="center">
                  <Typography variant="body1">{row.code}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{row.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{row.reorderLevel}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{getUnitName(row.unitOfMeasure)}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{row.description}</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon sx={{ color: theme.colors.border_color_grey }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon sx={{ color: theme.colors.border_color_grey }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Material</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Material Code"
              value={editDialog.data?.code || ''}
              onChange={(e) => handleEditFieldChange('code', e.target.value)}
              fullWidth
            />
            <TextField
              label="Material Name"
              value={editDialog.data?.name || ''}
              onChange={(e) => handleEditFieldChange('name', e.target.value)}
              fullWidth
            />
            <TextField
              label="Reorder Level"
              type="number"
              value={editDialog.data?.reorderLevel || 0}
              onChange={(e) => handleEditFieldChange('reorderLevel', Number(e.target.value))}
              fullWidth
            />
            <TextField
              label="Unit of Measure"
              value={editDialog.data?.unitOfMeasure || ''}
              onChange={(e) => handleEditFieldChange('unitOfMeasure', e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={editDialog.data?.description || ''}
              onChange={(e) => handleEditFieldChange('description', e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <Button 
            onClick={handleSaveEdit} 
            variant="contained"
            sx={{ backgroundColor: theme.colors.primary_color_green }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GeneratedMaterialTable;