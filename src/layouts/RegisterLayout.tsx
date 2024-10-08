import { Box } from '@mui/material';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RegisterLayout: React.FC = () => {
  return (
    <Box>
      <Outlet /> 
      <Navigate to="/register/material" />
    </Box>
  );
};

export  {RegisterLayout};
