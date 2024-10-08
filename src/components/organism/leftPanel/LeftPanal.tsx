import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, Link } from 'react-router-dom'; // Import Link
import theme from '../../theme';

// MUI Icons
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';  // For Category
import LocalShippingIcon from '@mui/icons-material/LocalShipping';  // For Supplier
import LayersIcon from '@mui/icons-material/Layers';  // For Variants
import ScaleIcon from '@mui/icons-material/Scale';  // For Unit of Measure
import HistoryIcon from '@mui/icons-material/History';  // For Purchase History
import StoreIcon from '@mui/icons-material/Store';  // For Raw Material
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';  // For Add Raw Material

import reg from "../../../assets/LeftRegistrionimage.png";
import set from "../../../assets/LeftSettingImage.png";
import man from "../../../assets/PurchaseImage.png";

interface LeftPanelProps {}

const LeftPanel: React.FC<LeftPanelProps> = () => {
  const location = useLocation();

  const getPathName = () => {
    const path = location.pathname.split('/')[1];
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const activeItem = getPathName();

  const imageMap: { [key: string]: string } = {
    '/register/material': reg,
    '/register/product': reg,
    '/setting/unit': set,
    '/setting/category': set,
    '/setting/supplier': set,
    '/setting/variants': set,
    '/manufacture/material': man,
    '/manufacture/purchase': man,
  };

  const renderPanelItems = () => {
    const items = [];

    switch (activeItem) {
      case 'Register':
        items.push(
          { to: "/register/material", icon: <StoreIcon />, text: "Raw Material" },
          { to: "/register/product", icon: <AssignmentIcon />, text: "Products" }
        );
        break;
      case 'Setting':
        items.push(
          { to: "/setting/unit", icon: <ScaleIcon />, text: "Units" },
          { to: "/setting/category", icon: <CategoryIcon />, text: "Category" },
          { to: "/setting/supplier", icon: <LocalShippingIcon />, text: "Suppliers" },
          { to: "/setting/variants", icon: <LayersIcon />, text: "Variants" }
        );
        break;
      case 'Manufacture':
        items.push(
          { to: "/manufacture/material", icon: <AddShoppingCartIcon />, text: "Add Raw Material" },
          { to: "/manufacture/purchase", icon: <HistoryIcon />, text: "Purchase History" }
        );
        break;
      default:
        return null; // No left panel for "Dashboard"
    }

    return items.map((item) => (
      <ListItem
  key={item.text}
  component={Link}
  to={item.to}
  sx={{
    //width:'200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',  // Center the combined icon and text
    backgroundColor: location.pathname === item.to ? theme.colors.primary_color_green : 'transparent', // Background when active
    borderRadius: location.pathname === item.to ? '47px' : '0',
    transition: 'background-color 0.1s', // Smooth transition
  }}
>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px', // Set exact gap of 4px between the icon and text
      flexGrow: 1,
      paddingLeft: '25px',  // Set paddingLeft to 12px
      paddingRight: '25px',
       
    }}
  >
    <ListItemIcon
      sx={{
        color: location.pathname === item.to ? theme.colors.secondary_background_color : theme.colors.font_color_textfeild,
        minWidth: 'auto',  // Remove default minWidth for better alignment
      }}
    >
      {item.icon}
    </ListItemIcon>
    <ListItemText
      primary={item.text}
      sx={{
        color: location.pathname === item.to ? theme.colors.secondary_background_color : theme.colors.font_color_textfeild,  // Text color when active or inactive
        textAlign: 'left',
      }}
    />
  </Box>
</ListItem>
    ));
  };

  const renderActiveImage = () => {
    if (activeItem === 'Register' || activeItem === 'Setting' || activeItem === 'Manufacture') {
      return <img src={imageMap[location.pathname]} alt="Active item image" style={{ width: '260px', marginTop: '30px', height: '230px' }} />;
    }
    return null; // Return null for other routes without images
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
        backgroundColor: theme.colors.secondary_background_color,
        height: 'calc(100vh - 200px)',
        justifyContent: 'space-between',
        borderRight: `2px solid ${theme.colors.textfeild_color}`,
        
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        
        }}
      >
        {renderPanelItems()}
      </List>

      {renderActiveImage()}

    </Box>
  );
};

export { LeftPanel };
