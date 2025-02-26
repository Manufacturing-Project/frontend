import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

import { SearchBar } from '../../molecules'; 

import {  Logo } from '../../molecules';


import { MenuBar } from '../../organism';
import theme from '../../theme';
import ProfileIcon from '../../../assets/user.png';
import { FullLogo } from '../../organism/fullLogo/FullLogo';

const Header: React.FC = () => {
  /* Temporary search options */
  const searchOptions = ['Dashboard', 'Registration', 'Manufacture', 'Setting']; 

  const handleSearchChange = (event: React.SyntheticEvent, value: string | null) => {
    console.log('Selected:', value);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.secondary_background_color,
        boxShadow: `0px 2px 4px ${theme.colors.black_Transparent_1}`,
        position: 'fixed',
        width: '100%',
        zIndex: '2',
        
        
      }}
    >
      {/* First Row: Logo, Heading, and Search Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '10px 0',
          height: '70px',
        }}
      >
        <FullLogo />
        <SearchBar options={searchOptions}  onChange={handleSearchChange} />
        <Avatar
          alt="Remy Sharp"
          src={ProfileIcon}
          sx={{ 
            display: 'inline-block',
            cursor: 'pointer',
            marginRight: '40px',
            width: '45px',
            height: '45px',
          }}
        />
      </Box>

      {/* Second Row: Menu Bar */}
      <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            height: '50px', 
          }}>
        <MenuBar />
      </Box>
    </Box>
  );
};

export  {Header};

