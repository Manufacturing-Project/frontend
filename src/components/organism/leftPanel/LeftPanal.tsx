/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';
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
    '/manufacture/purchase':man,
  };

  const renderPanelItems = () => {
    const items = [];

    switch (activeItem) {
      case 'Register':
        items.push(
          { href: "/register/material", icon: <StoreIcon />, text: "Raw Material" },
          { href: "/register/product", icon: <AssignmentIcon />, text: "Products" }
        );
        break;
      case 'Setting':
        items.push(
          { href: "/setting/unit", icon: <ScaleIcon />, text: "Unit of Measure" },
          { href: "/setting/category", icon: <CategoryIcon />, text: "Category" },
          { href: "/setting/supplier", icon: <LocalShippingIcon />, text: "Supplier Information" },
          { href: "/setting/variants", icon: <LayersIcon />, text: "Variants" }
        );
        break;
      case 'Manufacture':
        items.push(
          { href: "/manufacture/material", icon: <AddShoppingCartIcon />, text: "Add Raw Material" },
          { href: "/manufacture/purchase", icon: <HistoryIcon />, text: "Purchase History" }
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
          backgroundColor: location.pathname === item.href ? theme.colors.primary_color_green : 'transparent', // Background when active
          borderRadius: location.pathname === item.href ? '47px' : '0', 
          transition: 'background-color 0.3s', // Smooth transition
        }}
      >
        <ListItemIcon
          sx={{
            color: location.pathname === item.href ? theme.colors.secondary_background_color : theme.colors.font_color_textfeild, // Icon color when active or inactive
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          sx={{
            color: location.pathname === item.href ? theme.colors.secondary_background_color : theme.colors.font_color_textfeild, // Text color when active or inactive
          }}
        />
      </ListItem>
    ));
  };

  const renderActiveImage = () => {
    if (activeItem === 'Register' || activeItem === 'Setting'|| activeItem === 'Manufacture') {
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
        height: 'calc(100vh - 128px)',
        width: '220px',
      }}
    >
      <List>
        {renderPanelItems()}
      </List>

      {renderActiveImage()} {/* This will render the image under the list items */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 'auto', // Ensures that the logout button is pushed to the bottom
          paddingBottom: '50px',
        }}
      >
        
      </Box>
    </Box>
  );
};

export { LeftPanel };
