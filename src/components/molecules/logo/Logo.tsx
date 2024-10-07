import React from 'react';
import { styled } from '@mui/system';
import defaultLogo from '../../../assets/LogoOriginal 1.png'; // Corrected path to logo
import { Link } from 'react-router-dom';

interface LogoProps {
}

// Use styled('img') to style the img element
const StyledImg = styled('img')<LogoProps>(() => ({
  display: 'inline-block',
  cursor: 'pointer',   
  margin: '0 20px',
  width: '45px',
  height: '45px',
}));

const Logo: React.FC<LogoProps> = () => {
  return (
    <Link to = "/dashboard" style={{ display: 'inline-block' }}>
      <StyledImg
        src={defaultLogo}
        alt="Logo"
      />
    </Link>
  );
};

export { Logo };