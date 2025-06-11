import React from 'react';
import { Box } from '@mui/material';
import Lottie from 'react-lottie';
import productAnimation from '../../../assets/UnderDevelopment.json'; // Adjust this path based on your project structure


const Product: React.FC = () => {

  const defaultOptions = {
    loop: true, 
    autoplay: true,
    animationData: productAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', 
    },
  };

  return (
    <Box>     
      <Lottie options={defaultOptions} height={600} width={600} />
    </Box>
  );
};

export { Product };
