// MenuBar.styled.ts

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MenuBarWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
}));
