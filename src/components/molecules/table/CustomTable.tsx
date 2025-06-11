// CustomTable.tsx
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { StyledTableCell, StyledTableRow } from './CustomTable.styled';
import { CustomTableProps } from '../../../utils/types/molecules/props/customTableProps';

const CustomTable: React.FC<CustomTableProps> = ({ columns, rows, onEdit, onDelete }) => {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <StyledTableCell
                  key={col.accessor}
                  align={col.align || 'left'}
                  sx={{ width: col.width }}
                >
                  {col.header}
                </StyledTableCell>
              ))}
              {(onEdit || onDelete) && (
                <StyledTableCell align="center" sx={{ width: '100px' }}>
                  Actions
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((col) => (
                  <StyledTableCell
                    key={col.accessor}
                    align={col.align || 'left'}
                    sx={{ width: col.width }}
                  >
                    {row[col.accessor]}
                  </StyledTableCell>
                ))}
                {(onEdit || onDelete) && (
                  <StyledTableCell align="center">
                    {onEdit && (
                      <IconButton onClick={() => onEdit(row)} color="primary">
                        <EditIcon />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton onClick={() => onDelete(row)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;
