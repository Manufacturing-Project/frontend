import React from 'react';
import { Box} from '@mui/material';
import {MenuItem} from '../index'; // Adjust the import path as needed
import theme from '../../theme';
import DashboardIcon from '../../../assets/Dashboard.png';
import RegistrationIcon from '../../../assets/Registration.png';
import PurchaseIcon from '../../../assets/manufacture.png';
import SettingIcon from '../../../assets/Setting.png';
import { useLocation } from 'react-router-dom';

 // Import the LeftPanel component

const MenuBar: React.FC = () => {
  
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);


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
          path='/dashboard'
          label="Dashboard" 
          isActive={isActive('/dashboard')}
        />

        <MenuItem 
          icon={<img src={RegistrationIcon} alt="Registration" />} 
          path='/register'
          label="Registration" 
          isActive={isActive('/registration')}
        />
        <MenuItem 
          icon={<img src={PurchaseIcon} alt="Manufacture" />} 
          path='/manufacture'
          label="Manufacture" 
          isActive={isActive('/manufacture')}
        />
        <MenuItem 
          icon={<img src={SettingIcon} alt="Setting" />} 
          path='/setting'
          label="Setting" 
          isActive={isActive('/setting')}
        />
      </Box>

    </Box>
  );
};

export  {MenuBar};
