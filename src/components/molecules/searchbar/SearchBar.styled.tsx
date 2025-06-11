// SearchBar.styled.tsx
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import theme from '../../theme';

export const SearchBarWrapper = styled(Stack)(() => ({
  width: 450,
  borderRadius: '28px',
  justifyContent: 'center',
  height: '45px',
  backgroundColor: theme.colors.searchbar_color,
  color: theme.colors.font_searchbar,
}));

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.colors.font_searchbar,
  },
  '& .MuiInputBase-input': {
    padding: '6px',
    '::placeholder': {
      color: theme.colors.font_searchbar,
      opacity: 1,
    },
  },
  color: theme.colors.font_searchbar,
}));
