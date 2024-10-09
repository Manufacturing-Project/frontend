import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import theme from '../../theme';

export interface EmptyInfoBoxProps {
  text: string;
  buttonText: string; 
  onButtonClick: () => void;
}

const EmptyInfoBox: React.FC<EmptyInfoBoxProps> = ({ text, buttonText, onButtonClick }) => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
      <Typography variant="h6" sx={{ color: theme.colors.emtybox_color }}>
        {text}
      </Typography>
      <Button
        variant="contained"
        onClick={onButtonClick}
        sx={{
          backgroundColor: theme.colors.primary_color_green,
          color: theme.colors.secondary_background_color,
          marginTop: '20px',
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default EmptyInfoBox;
