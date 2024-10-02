import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, TextField, Select, MenuItem, FormControl,
  InputLabel, TablePagination
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';

const rawMaterials = [
  { code: 'IN-GRE', name: 'Ink - Green', reorderLevel: 30, unit: 'ml', description: 'Atlas - Ink - Carbon', status: 'DEACTIVE' },
  { code: 'IN-BLA', name: 'Ink - Black', reorderLevel: 40, unit: 'ml', description: 'Atlas - Ink - Carbon', status: 'DEACTIVE' },
  { code: 'IN-YEL', name: 'Ink - Yellow', reorderLevel: 50, unit: 'ml', description: 'Atlas - Ink - Carbon', status: 'ACTIVE' },
  { code: 'IN-BRO', name: 'Ink - Brown', reorderLevel: 10, unit: 'ml', description: 'Atlas - Ink - Carbon', status: 'ACTIVE' },
  { code: 'PA-RE', name: 'Paper-Red-40', reorderLevel: 12, unit: 'pcs', description: 'Dumindu - Double-CR', status: 'ACTIVE' },
  { code: 'PA-RE', name: 'Paper-Red-50', reorderLevel: 15, unit: 'pcs', description: 'Dumindu - Double-CR', status: 'ACTIVE' },
  { code: 'PA-RE', name: 'Paper-Red-100', reorderLevel: 16, unit: 'pcs', description: 'Dumindu - Double-CR', status: 'ACTIVE' },
  { code: 'PA-RE', name: 'Paper-Red-80', reorderLevel: 53, unit: 'pcs', description: 'Dumindu - Double-CR', status: 'DEACTIVE' },
  { code: 'PA-RE', name: 'Paper-Red-60', reorderLevel: 10, unit: 'pcs', description: 'Dumindu - Double-CR', status: 'ACTIVE' },
];

export const Rawmaterial = () => {
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [codeFilter, setCodeFilter] = React.useState('');
  const [nameFilter, setNameFilter] = React.useState('');
  const [reorderLevelFilter, setReorderLevelFilter] = React.useState('');
  const [unitFilter, setUnitFilter] = React.useState('');
  const [descriptionFilter, setDescriptionFilter] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
   
  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as string);
  };
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const filteredData = rawMaterials.filter((material) => {
    return (
      (statusFilter === 'All' || material.status === statusFilter) &&
      (codeFilter === '' || material.code.toLowerCase().includes(codeFilter.toLowerCase())) &&
      (nameFilter === '' || material.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (reorderLevelFilter === '' || material.reorderLevel.toString().includes(reorderLevelFilter)) &&
      (unitFilter === '' || material.unit.toLowerCase().includes(unitFilter.toLowerCase())) &&
      (descriptionFilter === '' || material.description.toLowerCase().includes(descriptionFilter.toLowerCase()))
    );
  });
  
  return (
    <TableContainer component={Paper}>
      <FormControl variant="outlined" style={{ margin: '10px', minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          label="Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="DEACTIVE">Deactive</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" style={{ float: 'right', margin: '10px' }}>
        + Register Raw Material
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Raw Material Code</TableCell>
            <TableCell>Raw Material Name</TableCell>
            <TableCell>Re-Order Level</TableCell>
            <TableCell>Unit of Measure</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <TextField
                size="small"
                placeholder="Search"
                value={codeFilter}
                onChange={(e) => setCodeFilter(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                size="small"
                placeholder="Search"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                size="small"
                placeholder="Search"
                value={reorderLevelFilter}
                onChange={(e) => setReorderLevelFilter(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                size="small"
                placeholder="Search"
                value={unitFilter}
                onChange={(e) => setUnitFilter(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                size="small"
                placeholder="Search"
                value={descriptionFilter}
                onChange={(e) => setDescriptionFilter(e.target.value)}
              />
            </TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.code}>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.reorderLevel}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ backgroundColor: row.status === 'ACTIVE' ? 'green' : 'red', color: 'white' }}
                >
                  {row.status}
                </Button>
              </TableCell>
              <TableCell>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Added an option for 5 rows per page
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
