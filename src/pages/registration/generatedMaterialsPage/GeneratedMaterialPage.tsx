import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { generateVariantCombinations } from './generateFunction';
import theme from '../../../components/theme';

interface TableRowData {
  code: string;
  name: string;
  reorderLevel: number;
  unitOfMeasure: string;
  description: string;
}

const GeneratedMaterialTable: React.FC = () => {
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

  // Initialize rows state
  const [rows, setRows] = useState<TableRowData[]>([]);

  // Update rows whenever generatedVariants change
  useEffect(() => {
    setRows(generatedVariants);
  }, [generatedVariants]);

  const handleEdit = (rowIndex: number) => {
    console.log('Editing row', rows[rowIndex]);
    // Implement your edit logic here
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
      <Typography variant="h4">Generated Materials</Typography>

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
                  <Typography variant="body1">{row.unitOfMeasure}</Typography>
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
    </Box>
  );
};

export default GeneratedMaterialTable;
