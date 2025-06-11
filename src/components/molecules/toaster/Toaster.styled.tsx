// Toaster.styled.ts

import { Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAlert = styled(Alert)<{ bgcolor?: string; fontcolor?: string }>(
  ({ bgcolor, fontcolor }) => ({
    width: '400px',
    backgroundColor: bgcolor,
    color: fontcolor,
  })
);
