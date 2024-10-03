import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import theme from '../../theme';
import DashboardIcon from '@mui/icons-material/Dashboard'; // MUI Dashboard icon
import AssignmentIcon from '@mui/icons-material/Assignment'; // MUI Assignment icon for Registration
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // MUI ShoppingCart icon for Purchase
import SettingsIcon from '@mui/icons-material/Settings'; // MUI Settings icon

interface LeftPanelProps {}

const LeftPanel: React.FC<LeftPanelProps> = () => {
  const location = useLocation();

  const getPathName = () => {
    const path = location.pathname.split('/')[1];
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const activeItem = getPathName();

  const renderPanelItems = () => {
    const items = [];

    switch (activeItem) {
      case 'Register':
        items.push(
          { href: "/register/material", icon: <DashboardIcon />, text: "Raw Material" },
          { href: "/register/product", icon: <AssignmentIcon />, text: "Products" }
        );
        break;
      case 'Setting':
        items.push(
          { href: "/setting/unit", icon: <SettingsIcon />, text: "Unit of Measure" },
          { href: "/setting/category", icon: <DashboardIcon />, text: "Category" },
          { href: "/setting/supplier", icon: <ShoppingCartIcon />, text: "Supplier Information" },
          { href: "/setting/variants", icon: <ShoppingCartIcon />, text: "Variants" }
        );
        break;
      case 'Manufacture':
        items.push(
          { href: "/manufacture/material", icon: <AssignmentIcon />, text: "Add Raw Material" },
          { href: "/manufacture/purchase", icon: <AssignmentIcon />, text: "Purchase History" }
        );
        break;
      default:
        return null; // No left panel for "Dashboard"
    }

    return items.map((item) => (
      <ListItem
        key={item.text}
        component="a"
        href={item.href}
        sx={{
          backgroundColor: location.pathname === item.href ? theme.colors.font_placeholder : 'transparent', // Highlight if active
          '&:hover': {
            backgroundColor: theme.colors.button_background_Logout, // Highlight on hover
          },
          transition: 'background-color 0.3s', // Smooth transition
        }}
      >
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    ));
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '128px',
        left: '0',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px',
        alignItems: 'center',
        backgroundColor: theme.colors.background_color,
        height: 'calc(100vh - 128px)',
        width: '220px',
      }}
    >
      <List>
        {renderPanelItems()}
      </List>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 'auto', // Ensures that the logout button is pushed to the bottom
          paddingBottom: '26px',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            // Add your logout logic here
          }}
          sx={{
            width: '150px',
            height: '40px',
            backgroundColor: theme.colors.button_background_Logout,
            color: theme.colors.font_color_logout,
            '&:hover': {
              backgroundColor: theme.colors.button_background_Logout, // Optional hover color
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export { LeftPanel };
