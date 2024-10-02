import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SettingsIcon from '@mui/icons-material/Settings';
import theme from '../../theme'; // Assuming you're importing your theme from here
 
 
// The MenuBar component without a separate MenuItem component
export const MenuBar: React.FC = () => {
  // Array of menu items with icon, label, path, and active state
  const menuItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', path: '/dashboard', isActive: true },
    { icon: <AppRegistrationIcon />, label: 'Registration', path: '/register', isActive: false },
    { icon: <ShoppingBagIcon />, label: 'Purchase', path: '/manufacture', isActive: false },
    { icon: <SettingsIcon />, label: 'Setting', path: '/setting', isActive: false }
  ];
 
  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap="40px" p={2} >
      {menuItems.map((item, index) => (
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
      ))}
    </Box>
  );
};