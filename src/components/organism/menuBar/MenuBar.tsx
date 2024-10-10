import React from 'react';
import { Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsIcon from '@mui/icons-material/Settings';
import TokenSharpIcon from '@mui/icons-material/TokenSharp';
import { MenuItem } from '../../molecules'; // Import the newly created MenuItem component
import theme from '../../theme';

export const MenuBar: React.FC = () => {
  // Array of menu items with icon, label, path
  const menuItems = [
    { icon: <DashboardIcon sx={{ color: theme.colors.black_Transparent_8 }} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <AppRegistrationIcon sx={{ color: theme.colors.black_Transparent_8 }} />, label: 'Registration', path: '/register' },
    { icon: <TokenSharpIcon sx={{ color: theme.colors.black_Transparent_8 }} />, label: 'Manufacture', path: '/manufacture' },
    { icon: <SettingsIcon sx={{ color: theme.colors.black_Transparent_8 }} />, label: 'Settings', path: '/setting' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          path={item.path}
        />
      ))}
    </Box>
  );
};
