// SearchBar.tsx
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { SearchBarProps } from '../../../utils/types/molecules/props/searchBarProps';
import { SearchBarWrapper, StyledTextField } from './SearchBar.styled';

const SearchBar: React.FC<SearchBarProps> = ({ options, onChange }): JSX.Element => {
  return (
    <SearchBarWrapper spacing={2}>
      <Autocomplete
        freeSolo
        id="free-solo-search-bar"
        disableClearable
        options={options}
        onChange={onChange}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              type: 'search',
              placeholder: 'Search ...',
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#fff' }} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </SearchBarWrapper>
  );
};

export { SearchBar };
