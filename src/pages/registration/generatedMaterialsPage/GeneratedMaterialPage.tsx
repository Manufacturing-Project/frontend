import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableContainer, TableHead,
  IconButton, Table as MuiTable,
  TableCell,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { generateVariantCombinations } from './generateFunction';
import { useGetUnitsQuery } from '../../../features/units/UnitsApiSlice';
import {
  TableRowData,
  EditDialogData,
  GeneratedMaterialTableProps
} from '../../../utils/types/pages/generatedMaterialsPage.types';
import {
  Container,
  HeaderText,
  CustomTableCell,
  StyledTableRow,
  StyledIconColor,
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledTextField,
  StyledDialogActions,
  SaveButton
} from './GeneratedMaterialTable.styled';

const GeneratedMaterialTable: React.FC<GeneratedMaterialTableProps> = ({ onMaterialsChange }) => {
  const { m_name, m_code, unit, reorderlevel, description, variants } = useSelector((state: RootState) => state.rawMaterial);
  const { data: units } = useGetUnitsQuery();

  const generatedVariants = variants.length
    ? generateVariantCombinations(m_name, m_code, variants).map(({ code, name }) => ({
        code,
        name,
        reorderLevel: reorderlevel,
        unitOfMeasure: unit,
        description,
      }))
    : [];

  const [rows, setRows] = useState<TableRowData[]>([]);
  const [editDialog, setEditDialog] = useState<EditDialogData>({ open: false, rowIndex: -1, data: null });

  useEffect(() => {
    setRows(generatedVariants);
  }, [generatedVariants]);

  useEffect(() => {
    if (onMaterialsChange) {
      onMaterialsChange(rows);
    }
  }, [rows, onMaterialsChange]);

  const handleEdit = (rowIndex: number) => {
    setEditDialog({ open: true, rowIndex, data: { ...rows[rowIndex] } });
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
    <Container>
      <HeaderText>Generated Materials ({rows.length})</HeaderText>

      <TableContainer sx={{ maxHeight: 400 }}>
        <MuiTable>
          <TableHead>
            <StyledTableRow>
              {['Code', 'Name', 'Reorder Level', 'Unit of Measure', 'Description', 'Action'].map((header) => (
                <CustomTableCell align="center" key={header}>
                  <HeaderText variant="body1">{header}</HeaderText>
                </CustomTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <TableCell align="center">{row.code}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.reorderLevel}</TableCell>
                <TableCell align="center">{getUnitName(row.unitOfMeasure)}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon sx={StyledIconColor} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon sx={StyledIconColor} />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {/* Edit Dialog */}
      <StyledDialog open={editDialog.open} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
        <StyledDialogTitle>Edit Material</StyledDialogTitle>
        <StyledDialogContent>
          <StyledTextField label="Material Code" value={editDialog.data?.code || ''} onChange={(e) => handleEditFieldChange('code', e.target.value)} fullWidth />
          <StyledTextField label="Material Name" value={editDialog.data?.name || ''} onChange={(e) => handleEditFieldChange('name', e.target.value)} fullWidth />
          <StyledTextField label="Reorder Level" type="number" value={editDialog.data?.reorderLevel || 0} onChange={(e) => handleEditFieldChange('reorderLevel', Number(e.target.value))} fullWidth />
          <StyledTextField label="Unit of Measure" value={editDialog.data?.unitOfMeasure || ''} onChange={(e) => handleEditFieldChange('unitOfMeasure', e.target.value)} fullWidth />
          <StyledTextField label="Description" value={editDialog.data?.description || ''} onChange={(e) => handleEditFieldChange('description', e.target.value)} multiline rows={3} fullWidth />
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <SaveButton onClick={handleSaveEdit} variant="contained">Save</SaveButton>
        </StyledDialogActions>
      </StyledDialog>
    </Container>
  );
};

export default GeneratedMaterialTable;
