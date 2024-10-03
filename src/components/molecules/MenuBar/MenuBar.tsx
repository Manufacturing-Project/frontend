import React from 'react';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to determine the active route
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SettingsIcon from '@mui/icons-material/Settings';
import theme from '../../theme'; // Assuming you're importing your theme from here

// The MenuBar component
export const MenuBar: React.FC = () => {
  const location = useLocation(); // Get the current path to determine the active menu item

  // Array of menu items with icon, label, path
  const menuItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', path: '/dashboard' },
    { icon: <AppRegistrationIcon />, label: 'Registration', path: '/register' },
    { icon: <ShoppingBagIcon />, label: 'Purchase', path: '/manufacture' },
    { icon: <SettingsIcon />, label: 'Settings', path: '/setting' }
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap="40px" p={2}>
      {menuItems.map((item, index) => {
         const isActive = location.pathname.startsWith(item.path) // Check if the current path matches the menu item's path

        return (
          <Link
            key={index}
            to={item.path}
            style={{
              textDecoration: 'none',
              color: 'black',
            }}
          >
            <Box
              sx={{
                fontWeight: theme.fontweight.base_font_weight_Medium,
                width: '200px',
                height: '50px',
                marginLeft: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
                cursor: 'pointer',
                padding: '0 10px',
                borderRadius: '20px',
                backgroundColor: isActive ? theme.colors.font_placeholder : 'transparent', // Apply background color if active
                color: isActive ? theme.colors.font_color_button : 'black', // Change text color if active

                '&:hover': {
                  backgroundColor: theme.colors.button_background_Logout,
                  borderRadius: '20px',
                  borderBottom: `3px solid ${theme.colors.font_color_textfeild}`, // Show underline on hover
                },
              }}
            >
              {/* Render Icon */}
              {item.icon}

              {/* Render Text */}
              <span style={{ fontSize: '16px' }}>{item.label}</span>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};
