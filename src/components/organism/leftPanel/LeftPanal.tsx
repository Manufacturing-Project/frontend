import React from 'react';
import { Box } from '@mui/material';
import { MenuItem } from '../../molecules/menuItem/MenuItem';
import { ImageLeft } from '../../atoms'; // Adjust the import path as needed
import { CustomButton } from '../../atoms'; // Adjust the import path as needed
import theme from '../../theme';
import DashboardIcon from '../../../assets/Dashboard.png';
import RegistrationIcon from '../../../assets/Registration.png';
import PurchaseIcon from '../../../assets/manufacture.png';
import SettingIcon from '../../../assets/Setting.png';
import PurchaseImage from '../../../assets/PurchaseImage.png'; // Adjust path
import SettingImage from '../../../assets/SettingImage.png'; // Adjust path
import { useLocation } from 'react-router-dom';

interface LeftPanelProps {
}

const LeftPanel: React.FC<LeftPanelProps> = () => {

  const location = useLocation();

  const getPathName = () => {
    const path = location.pathname.split('/')[1];
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const activeItem = getPathName();
  
  const getImageForActiveItem = () => {
    switch (activeItem) {
      case 'Register':
        return SettingImage;
      case 'Setting':
        return SettingImage;
      case 'Manufacture':
        return PurchaseImage;
      default:
        return ''; // Return an empty string or a default image if needed
    }
  };

  const renderPanelItems = () => {
    switch (activeItem) {
      case 'Register':
        return (
          <>
            <MenuItem icon={<img src={DashboardIcon} alt="Dashboard" />} label="Product Registration" path='/register/product' />
            <MenuItem icon={<img src={RegistrationIcon} alt="Registration" />} label="Raw Material Registration" path='/register/material'  />
          </>
        );
      case 'Setting':
        return (
          <>
            <MenuItem icon={<img src={SettingIcon} alt="Setting" />} label="Unit of Measure" path='/setting/unit' />
            <MenuItem icon={<img src={DashboardIcon} alt="Setting" />} label="Category" path='/setting/category'  />
            <MenuItem icon={<img src={PurchaseIcon} alt="Supplier" />} label="Supplier Information" path='/setting/supplier'  />
            <MenuItem icon={<img src={PurchaseIcon} alt="Supplier" />} label="Variants" path='/setting/variants'  />
          </>
        );
      case 'Manufacture':
        return (
          <>
            <MenuItem icon={<img src={PurchaseIcon} alt="Manufacture" />} label="Add Raw Material" path='/manufacture/material'  />
            <MenuItem icon={<img src={RegistrationIcon} alt="Manufacture" />} label="Purchase History" path='/manufacture/purchase' />
          </>
        );
      default:
        return null; // No left panel for "Dashboard"
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed', // Ensures the panel is positioned relative to the viewport
        top: '128px', // Adjust based on header height
        left: '0', // Align to the left
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        alignItems:'center',
        backgroundColor: theme.colors.background_color,
        height: 'calc(100vh - 128px)', // Adjust for header height if necessary
        width: '220px',
      }}
    >
      {renderPanelItems()}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '140px', // Pushes the content to the bottom
          paddingBottom:'26px' // Space for the logout button
        }}
      >
        <ImageLeft src={getImageForActiveItem()} alt="Active Section Image" />
        <CustomButton
          label="Logout"
          onClick={() => {
            // Add your logout logic here
          }}
          width="150px" // Adjust width if needed
          height="40px" // Adjust height if needed
          backgroundColor={theme.colors.button_background_Logout}
          color={theme.colors.font_color_logout}
           // Ensure spacing below the image and above the bottom line
        />
      </Box>
    </Box>
  );
};


export { LeftPanel };