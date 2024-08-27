import * as React from 'react';
import Button from '@mui/material/Button';
import theme from '../../theme';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  color?: string;
  label: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}

export const CustomButton = ({
  primary = false,
  backgroundColor,
  color,
  label,
  width,
  height,
  ...props
}: ButtonProps) => {
  const defaultBackgroundColor = primary
    ? theme.colors.button_background_main:
     theme.colors.button_background_Logout;

  const defaultfontColor = primary
    ? theme.colors.font_color_button
    : theme.colors.font_color_logout;

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: backgroundColor || defaultBackgroundColor,
        color: color || defaultfontColor, // Using color prop
        borderRadius: '4px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        width: width || 'auto',
        height: height || 'auto,'

      }}
      {...props}
    >
      {label}
    </Button>
  );
};

