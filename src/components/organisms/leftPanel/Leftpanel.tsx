import React from 'react';
import { Box } from '@mui/material';
import MenuItem from '../../molecules/MenuItem/MenuItem';
import theme from '../../theme';
import DashboardIcon from '../../../assets/Dashboard.png';
import RegistrationIcon from '../../../assets/Registration.png';
import PurchaseIcon from '../../../assets/manufacture.png';
import SettingIcon from '../../../assets/Setting.png';

interface LeftPanelProps {
  activeItem: string;
}

 export const LeftPanel: React.FC<LeftPanelProps> = ({ activeItem }) => {
  const renderPanelItems = () => {
    switch (activeItem) {
      case 'Registration':
        return (
          <>
            <MenuItem icon={<img src={DashboardIcon} alt="Dashboard" />} label="Product Registration" onClick={() => {}} />
            <MenuItem icon={<img src={DashboardIcon} alt="Dashboard" />} label="Raw Material Registration" onClick={() => {}} />
          </>
        );
      case 'Setting':
        return (
          <>
            <MenuItem icon={<img src={DashboardIcon} alt="Dashboard" />} label="Unit of Measure" onClick={() => {}} />
            <MenuItem icon={<img src={DashboardIcon} alt="Dashboard" />} label="Category" onClick={() => {}} />
            <MenuItem icon={<img src={DashboardIcon} alt="Dashboard" />} label="Supplier Information" onClick={() => {}} />
          </>
        );
      case 'Manufacture':
        return (
          <>
            <MenuItem icon={<img src={DashboardIcon} alt="Dashboard" />} label="Add Raw Material" onClick={() => {}} />
            <MenuItem icon={<img src={DashboardIcon} alt="Dashboard" />} label="Purchase History" onClick={() => {}} />
          </>
        );
      default:
        return null; // No left panel for "Dashboard"
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: theme.colors.background_color,
        height: '100vh',
        width: '250px',
      }}
    >
      {renderPanelItems()}
    </Box>
  );
};



