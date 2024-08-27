import React, { useState } from 'react';
import { Box } from '@mui/material';
import MenuItem from '../MenuItem/MenuItem'; // Adjust the import path as needed
import theme from '../../theme';
import DashboardIcon from '../../../assets/Dashboard.png';
import RegistrationIcon from '../../../assets/Registration.png';
import PurchaseIcon from '../../../assets/manufacture.png';
import SettingIcon from '../../../assets/Setting.png';
import { LeftPanel } from '../../organisms/leftPanel/LeftPanel';

 // Import the LeftPanel component

export const MenuBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleMenuItemClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Menu Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row', // Keep the top menu horizontal
          padding: '0 20px',
          backgroundColor: theme.colors.secondary_background_color,
        }}
      >
        <MenuItem 
          icon={<img src={DashboardIcon} alt="Dashboard" />} 
          label="Dashboard" 
          isActive={activeItem === 'Dashboard'} 
          onClick={() => handleMenuItemClick('Dashboard')}
        />
        <MenuItem 
          icon={<img src={RegistrationIcon} alt="Registration" />} 
          label="Registration" 
          isActive={activeItem === 'Registration'} 
          onClick={() => handleMenuItemClick('Registration')}
        />
        <MenuItem 
          icon={<img src={PurchaseIcon} alt="Manufacture" />} 
          label="Manufacture" 
          isActive={activeItem === 'Manufacture'} 
          onClick={() => handleMenuItemClick('Manufacture')}
        />
        <MenuItem 
          icon={<img src={SettingIcon} alt="Setting" />} 
          label="Setting" 
          isActive={activeItem === 'Setting'} 
          onClick={() => handleMenuItemClick('Setting')}
        />
      </Box>

      {/* Left Panel */}
      {activeItem !== 'Dashboard' && <LeftPanel activeItem={activeItem} />}
    </Box>
  );
};


