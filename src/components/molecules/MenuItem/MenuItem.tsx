import React from 'react';
import { Icon, MenuText } from '../../atoms';
import { Box } from '@mui/material';
import theme from '../../theme';

interface MenuItemProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        fontWeight:theme.fontweight.base_font_weight_Medium,
        width: '200px',
        height: '50px',
        marginLeft: '50px',
        display: 'flex',
        paddingRight:'10px',
        alignItems: 'center',
        gap: '40px',
        borderBottom: isActive ? `3px solid ${theme.colors.font_color_textfeild}` : 'none',
        cursor: 'pointer',
        padding: '0 10px', // Added padding to ensure proper spacing
        '&:hover': {
          backgroundColor: theme.colors.button_background_Logout, // Optional hover effect
          borderRadius:'20px',
        },
      }}
    >
      {/* Use the Icon and Menutext components */}
      <Icon icon={icon} />
      <MenuText text={label} />
    </Box>
  );
};

export { MenuItem };