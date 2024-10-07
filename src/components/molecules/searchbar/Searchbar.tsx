import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import theme from '../../theme';

interface SearchBarProps {
  options: string[];
  label: string;
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ options, label, onChange }): JSX.Element => {
  return (
    <Stack spacing={2} sx={{ width: 400,justifyContent: "center",paddingLeft: '5px',paddingRight: '5px', borderRadius: '28px', height: '45px', backgroundColor: theme.colors.searchbar_color }}>
      <Autocomplete
        freeSolo
        id="free-solo-search-bar"
        disableClearable
        options={options}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            //label={label}
           placeholder={label}

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
                color: theme.colors.font_color_button, // Use your theme's placeholder color
              },
              '& .MuiInputBase-input': {
                padding: '8px',
             // Adjust padding to fit your design
              },
            
            }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  <InputAdornment position="end">
                    <SearchIcon htmlColor="color: theme.colors.font_color_button" />
                  </InputAdornment>
                </>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
};

export { SearchBar };
