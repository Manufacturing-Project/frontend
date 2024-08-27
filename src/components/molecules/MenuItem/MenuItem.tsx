import React from 'react';
import { Box } from '@mui/material';
import theme from '../../theme';

interface MenuItemProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '10px',
        cursor: 'pointer',
        
        
      }}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Box>
  );
};

export default MenuItem;
