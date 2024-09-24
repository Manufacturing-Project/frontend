import React from 'react';
import { Box, Typography } from '@mui/material';
import MenuBar from '../../molecules/MenuBar/MenuBar'; // Adjust the import path as needed
import { SearchBar } from '../../atoms/searchBar/SearchBar'; // Adjust the import path as needed
import theme from '../../theme';
import { Logo } from '../../atoms/Logo/Logo';
import { ProfilePhoto } from '../../atoms/profilePhoto/ProfilePhoto';
import ProfileIcon from '../../../assets/user.png';

const Header: React.FC = () => {
  const searchOptions = ['Dashboard', 'Registration', 'Manufacture', 'Setting']; // Example options

  const handleSearchChange = (event: React.SyntheticEvent, value: string | null) => {
    console.log('Selected:', value);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.secondary_background_color,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '10px 10px',
        
      }}
    >
      {/* First Row: Logo, Heading, and Search Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          height: '40px' // Space between the two rows
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Logo />
          <Typography
            variant='h1'
            sx={{
              fontSize: theme.font.base_font_size_h1,
              fontWeight: theme.fontweight.base_font_weight_ExtraBold,
            }}
          >
            Manufacturing Project
          </Typography>
        </Box>
        <SearchBar options={searchOptions} label="Search..." onChange={handleSearchChange} />
           <ProfilePhoto alt={''} src={ProfileIcon} />
      </Box>

      {/* Second Row: Menu Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'center' ,height: '50px' }}>
        <MenuBar />
      </Box>
    </Box>
  );
};

export default Header;
