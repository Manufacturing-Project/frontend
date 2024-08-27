import React from 'react';
import { styled } from '@mui/system';
import defaultLogo from '../../../Assets/logo.png'; // Corrected path to logo

interface LogoProps {
  
  width?: string;
  height?: string;
  altText?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  src?: string;
}

// Use styled('img') to style the img element
const StyledImg = styled('img')<LogoProps>(({ width, height }) => ({
  display: 'inline-block',
  width: width || '100px',  // Default width
  height: height || 'auto', // Auto-adjust height based on the aspect ratio
  cursor: 'pointer',        // Pointer cursor if the logo is clickable
}));

export const Logo: React.FC<LogoProps> = ({
  width,
  height,
  altText = 'Logo',
  href,
  onClick,
  className,
  src = defaultLogo, // Default to the standard logo if no src is provided
}) => {
  const logoElement = (
    <StyledImg
      src={src}
      alt={altText}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    />
  );

  return href ? (
    <a href={href} style={{ display: 'inline-block' }}>
      {logoElement}
    </a>
  ) : (
    logoElement
  );
};
