import { Box } from '@mui/material';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const SettingLayout: React.FC = () => {
  return (
    <Box>
      <Outlet />
      <Navigate to="/setting/unit" />
    </Box>
  );
};

export  {SettingLayout};
