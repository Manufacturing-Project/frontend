import React from 'react';
import { Box } from '@mui/material';
import Lottie from 'react-lottie';
import productAnimation from '../../../assets/Animation.json'; // Adjust this path based on your project structure

interface Props {
  // Define your props here
}

const Product: React.FC<Props> = (props) => {

  const defaultOptions = {
    loop: true, // Set to false if you don't want it to loop
    autoplay: true, // Autoplay the animation
    animationData: productAnimation, // The animation JSON file
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust the aspect ratio as needed
    },
  };

  return (
    <Box>     
      <Lottie options={defaultOptions} height={400} width={400} />
    </Box>
  );
};

export { Product };
