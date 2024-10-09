import React from 'react';
import { Box, Typography } from '@mui/material';
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
    { icon: <DashboardIcon sx={{ color: theme.colors.black_Transparent_8 }}  />, label: 'Dashboard', path: '/dashboard' },
    { icon: <AppRegistrationIcon sx={{ color: theme.colors.black_Transparent_8 }} />, label: 'Registration', path: '/register' },
    { icon: <TokenSharpIcon sx={{ color: theme.colors.black_Transparent_8 }}/>, label: 'Manufacture', path: '/manufacture' },
    { icon: <SettingsIcon sx={{ color: theme.colors.black_Transparent_8 }} />, label: 'Settings', path: '/setting' }
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
        const isActive = location.pathname.startsWith(item.path); // Check if the current path matches the menu item's path

        return (
          <Link 
            key={index}
            to={item.path}
            style={{
              textDecoration: 'none',
              color: theme.colors.black_Transparent_9, 
            }}
          >
            <Box
              sx={{
                fontWeight: isActive
                  ? theme.fontweight.base_font_weight_Bold
                  : theme.fontweight.base_font_weight_Medium,
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: theme.gap.base_gap_8,
                cursor: 'pointer',
                borderBottom: isActive
                  ? `3px solid ${theme.colors.black_Transparent_9}`
                  : 'none',

                '&:hover': {
                  fontWeight: theme.fontweight.base_font_weight_Bold,
                  borderBottom: `3px solid ${theme.colors.black_Transparent_9}`,
                },
              }}
            >
              {/* Render Icon */}
              {item.icon}

              {/* Render Text */}
              <Typography
                variant="h6"
                sx={{
                  fontSize: theme.font.base_font_size_menubar,
                  color: theme.colors.black_Transparent_9,
                  fontWeight: isActive
                    ? theme.fontweight.base_font_weight_SemiBold
                    : theme.fontweight.base_font_weight_Medium,
                  fontFamily:theme.typography.fontFamily,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};
