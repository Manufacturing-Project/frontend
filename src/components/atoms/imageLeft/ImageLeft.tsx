import React from 'react';

interface ImageAtomProps {
  src: string;
  alt: string;
}

const ImageLeft: React.FC<ImageAtomProps> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '220px', height: '180px', objectFit: 'cover' }}
    />
  );
};

export { ImageLeft };
