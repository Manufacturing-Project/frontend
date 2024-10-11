import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import theme from '../../theme';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, label, path }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(path); // Check if the current path matches the menu item's path

  return (
    <Link 
      to={path}
      style={{
        textDecoration: 'none',
        color: theme.colors.black_Transparent_9, 
      }}
    >
      <Box
        sx={{
          fontWeight: isActive
            ? theme.fontweight.base_font_weight_Bold
            : theme.fontweight.base_font_weight_Medium,
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: theme.gap.base_gap_8,
          cursor: 'pointer',
          borderBottom: isActive
            ? `3px solid ${theme.colors.black_Transparent_9}`
            : 'none',

          '&:hover': {
            fontWeight: theme.fontweight.base_font_weight_Bold,
            borderBottom: `3px solid ${theme.colors.black_Transparent_9}`,
          },
        }}
      >
        {/* Render Icon */}
        {icon}

        {/* Render Text */}
        <Typography
          variant="h6"
          sx={{
            fontSize: theme.font.base_font_size_menubar,
            color: theme.colors.black_Transparent_9,
            fontWeight: isActive
              ? theme.fontweight.base_font_weight_SemiBold
              : theme.fontweight.base_font_weight_Medium,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Link>
  );
};
