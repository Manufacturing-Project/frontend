import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export interface ProfilePhotoProps {
  width?: string;
  height?: string;
  alt: string;
  src: string;
}


export const ProfilePhoto = ({
    src,
    alt, 
    }: ProfilePhotoProps) => {
  return (
    <Stack direction="row" spacing={2}> 
      <Avatar alt={alt} src={src} />
    </Stack> 
  )
}
