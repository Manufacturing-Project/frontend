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
      <Typography variant="h6" sx={{ color: '#333' }}>
        {text}
      </Typography>
      <Button
        variant="contained"
        onClick={onButtonClick}
        sx={{
          backgroundColor: theme.colors.button_background_setting,
          color: theme.colors.font_color_button,
          marginTop: '20px',
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default EmptyInfoBox;
