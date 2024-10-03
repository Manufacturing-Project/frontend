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
    switch (activeItem) {
      case 'Register':
        return (
          <>
            <ListItem  component="a" href="/register/product">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Product Registration" />
            </ListItem>
            <ListItem  component="a" href="/register/material">
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Raw Material Registration" />
            </ListItem>
          </>
        );
      case 'Setting':
        return (
          <>
            <ListItem  component="a" href="/setting/unit">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Unit of Measure" />
            </ListItem>
            <ListItem  component="a" href="/setting/category">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
            <ListItem  component="a" href="/setting/supplier">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Supplier Information" />
            </ListItem>
            <ListItem  component="a" href="/setting/variants">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Variants" />
            </ListItem>
          </>
        );
      case 'Manufacture':
        return (
          <>
            <ListItem  component="a" href="/manufacture/material">
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Add Raw Material" />
            </ListItem>
            <ListItem  component="a" href="/manufacture/purchase">
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Purchase History" />
            </ListItem>
          </>
        );
      default:
        return null; // No left panel for "Dashboard"
    }
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