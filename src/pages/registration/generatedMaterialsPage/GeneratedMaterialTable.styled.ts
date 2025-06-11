import { styled } from '@mui/material/styles';
import {
  Box,
  TableCell,
  TableRow,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import theme from '../../../components/theme';

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  paddingLeft: '60px',
  backgroundColor: theme.colors.secondary_background_color,
  height: '100%',
  boxSizing: 'border-box',
});


export const HeaderText = styled(Typography)({
  fontSize: '1.5rem',
});

export const CustomTableCell = styled(TableCell)({
  backgroundColor: theme.colors.table_cell_color,
});

export const StyledTableRow = styled(TableRow)({
  backgroundColor: 'rgba(33, 150, 243, 0.08)',
});

export const StyledIconColor = {
  color: theme.colors.border_color_grey,
};

export const StyledIcon = {
  color: theme.colors.border_color_grey,
};

export const StyledDialog = styled(Dialog)({});

export const StyledDialogTitle = styled(DialogTitle)({});

export const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  paddingTop: 8,
});

export const StyledTextField = styled(TextField)({});

export const StyledDialogActions = styled(DialogActions)({});

export const SaveButton = styled(Button)({
  backgroundColor: theme.colors.primary_color_green,
});
