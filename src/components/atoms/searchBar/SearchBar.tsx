import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  options: string[];
  label: string;
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ options, label, onChange }): JSX.Element => {
  return (
    <Stack spacing={2} sx={{ width: 300, borderRadius: '28px' }}>
      <Autocomplete
        freeSolo
        id="free-solo-search-bar"
        disableClearable
        options={options} 
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  <InputAdornment position="end">
                    <SearchIcon />
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

export {SearchBar};
