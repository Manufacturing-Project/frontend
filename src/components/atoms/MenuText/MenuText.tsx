import React from 'react';
import { Typography } from '@mui/material';

interface LabelProps {
  text: string;
}

const Menutext: React.FC<LabelProps> = ({ text }) => {
  return (
    <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 1 }}>
      {text}
    </Typography>
  );
};

export  {Menutext};
