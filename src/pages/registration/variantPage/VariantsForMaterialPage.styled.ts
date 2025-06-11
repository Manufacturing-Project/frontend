import { Box, Button, styled } from '@mui/material';
import theme from '../../../components/theme';

export const Wrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  paddingLeft: '60px',
  backgroundColor: theme.colors.secondary_background_color,
  height: '100%',
  boxSizing: 'border-box',
});

export const AddButtonStyled = styled(Button)({
  alignSelf: 'flex-end',
  width: '120px',
  height: '40px',
  textTransform: 'capitalize',
  backgroundColor: theme.colors.primary_color_green,
  color: theme.colors.secondary_background_color,
  '&:hover': {
    backgroundColor: theme.colors.primary_color_green,
  },
});

export const FieldsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  rowGap: '24px',
});

export const GridRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: '24px',
  alignItems: 'flex-start',
});

export const GridItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const ChipsContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
});
