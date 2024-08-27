import React, { useState } from 'react';
import { Box ,useTheme} from '@mui/material';
import MenuItem from '../MenuItem/MenuItem'; // Adjust the import path as needed

import DashboardIcon from '../../../components/Assets/Icon/Dashboard.png';
import RegistrationIcon from '../../../components/Assets/Icon/Registration.png';
import PurchaseIcon from '../../../components/Assets/Icon/manufacture.png';
import SettingIcon from '../../../components/Assets/Icon/Setting.png';

const MenuBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const theme = useTheme();

  const handleMenuItemClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: theme.colors.secondary_background_color,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          icon={<img src={PurchaseIcon} alt="Purchase" />} 
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
    </Box>
  );
};

export default MenuBar;
