import React from 'react';
import { Box } from '@mui/material';

interface IconProps {
  icon: React.ReactNode;
}

export const Icon: React.FC<IconProps> = ({ icon }) => {
  return (
    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
      {icon}
    </Box>
  );
};