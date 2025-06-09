import React from 'react';
<<<<<<< Updated upstream
import { Box, Typography, Avatar } from '@mui/material';

=======
>>>>>>> Stashed changes
import { SearchBar } from '../../molecules'; 
import { MenuBar } from '../../organism';
import { FullLogo } from '../../organism/fullLogo/FullLogo';
import { StyledHeaderContainerBox , StyledAvatarBox , StyledSecondRowBox , StyledfirstRowBox } from './Header.styled';
const Header: React.FC = () => {
  /* Temporary search options */
  const searchOptions = ['Dashboard', 'Registration', 'Manufacture', 'Setting']; 

  const handleSearchChange = (event: React.SyntheticEvent, value: string | null) => {
    console.log('Selected:', value);
  };

  return (
    <StyledHeaderContainerBox >
      {/* First Row: Logo, Heading, and Search Bar */}
      <StyledfirstRowBox>
        <FullLogo />
        <SearchBar options={searchOptions}  onChange={handleSearchChange} />
        <StyledAvatarBox/>
      </StyledfirstRowBox>

      {/* Second Row: Menu Bar */}
      <StyledSecondRowBox >
        <MenuBar />
      </StyledSecondRowBox>
    </StyledHeaderContainerBox>
  );
};

export  {Header};

