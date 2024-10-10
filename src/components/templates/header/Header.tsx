import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import {  Logo } from '../../molecules';
import { SearchBar } from '../../molecules'; 
import { MenuBar } from '../../organism';
import theme from '../../theme';
import ProfileIcon from '../../../assets/user.png';

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
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
        }}
        >
          <Logo />
          <Box sx= {{
                display: 'flex',
                gap: theme.gap.base_gap_8,
          }}>
            <Typography
              variant='h4'
              sx={{
                color: theme.colors.primary_color_green,
                fontWeight: theme.fontweight.base_font_weight_Bold,
              }}
            >
              Manufacturing
            </Typography>
            <Typography
              variant='h4'
              sx={{
                color: theme.colors.secondary_color_yellow,
                fontWeight: theme.fontweight.base_font_weight_Bold,
              }}
            >
              Project
            </Typography>
          </Box>
        </Box>
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

