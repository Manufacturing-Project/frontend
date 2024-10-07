import React from 'react';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to determine the active route
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsIcon from '@mui/icons-material/Settings';
import TokenSharpIcon from '@mui/icons-material/TokenSharp';
import theme from '../../theme'; // Assuming you're importing your theme from here
 
// The MenuBar component
export const MenuBar: React.FC = () => {
  const location = useLocation(); // Get the current path to determine the active menu item
 
  // Array of menu items with icon, label, path
  const menuItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', path: '/dashboard' },
    { icon: <AppRegistrationIcon />, label: 'Registration', path: '/register' },
    { icon: <TokenSharpIcon />, label: 'Manufacture', path: '/manufacture' },
    { icon: <SettingsIcon />, label: 'Settings', path: '/setting' }
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
      {menuItems.map((item, index) => {
         const isActive = location.pathname.startsWith(item.path) // Check if the current path matches the menu item's path
 
        return (
          <Link
            key={index}
            to={item.path}
            style={{
              textDecoration: 'none',
              color: theme.colors.font_color_textfeild,
            }}
          >
            <Box
              sx={{
                frontWeight: isActive ? theme.fontweight.base_font_weight_Bold : theme.fontweight.base_font_weight_Medium,
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                borderBottom: isActive ? `3px solid ${theme.colors.font_color_textfeild}` : 'none',  
 
                '&:hover': {
                  fontWeight: theme.fontweight.base_font_weight_Bold,
                  borderBottom: `3px solid ${theme.colors.font_color_textfeild}`,
                },
              }}
            >
              {/* Render Icon */}
              {item.icon}
 
              {/* Render Text */}
              <span style={{
                fontSize: '28px',
                fontWeight: isActive ? theme.fontweight.base_font_weight_Bold : theme.fontweight.base_font_weight_Medium,
                }}>
                  {item.label}
                </span>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};