import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import theme from '../../theme';

interface SearchBarProps {
  options: string[]; 
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ options, onChange }): JSX.Element => {
  return (
    <Stack
      spacing={2}
      sx={{
        width: 450,
        borderRadius: '28px',
        justifyContent: 'center',
        height: '45px',
        backgroundColor: theme.colors.searchbar_color,
        color: theme.colors.font_searchbar,
      }}
    >
      <Autocomplete
        freeSolo
        id="free-solo-search-bar"
        disableClearable
        options={options}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent', // Remove the border
                },
                '&:hover fieldset': {
                  borderColor: 'transparent', // Remove the border on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent', // Remove the border when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: theme.colors.font_searchbar, // Placeholder color
              },
              '& .MuiInputBase-input': {
                padding: '6px', // Adjust padding
                '::placeholder': {
                  color: theme.colors.font_searchbar, // Custom placeholder color
                  opacity: 1, // Ensure full opacity for the placeholder
                },
              },
              color: theme.colors.font_searchbar
            }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              placeholder: 'Search ...',
              startAdornment: ( // This adds the search icon at the beginning
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.colors.font_searchbar}} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
};

export { SearchBar };
