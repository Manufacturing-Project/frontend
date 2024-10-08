import { Box } from '@mui/material';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ManufactureLayout: React.FC = () => {
  return (
    <Box>
      <Outlet /> 
      <Navigate to="/manufacture/purchase" />
    </Box>
  );
};

export  { ManufactureLayout };