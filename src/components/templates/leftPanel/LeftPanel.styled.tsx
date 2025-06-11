import { styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemIcon, ListItemProps, ListItemText } from '@mui/material';
import theme from '../../theme';

export const PanelContainer = styled(Box)({
  position: 'fixed',
  top: '128px',
  left: '0',
  display: 'flex',
  flexDirection: 'column',
  padding: '40px',
  alignItems: 'center',
  backgroundColor: theme.colors.secondary_background_color,
  height: 'calc(100vh - 100px)',
  justifyContent: 'space-between',
  borderRight: `2px solid ${theme.colors.textfeild_color}`,
});

export const StyledList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.gap.base_gap_10,
});

interface StyledListItemProps extends ListItemProps {
  active: boolean;
}


export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyledListItemProps>(({ active, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: active ? theme.colors.primary_color_green : 'transparent',
  borderRadius: active ? '47px' : '0',
  transition: 'background-color 0.1s',
}));

export const ListItemContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexGrow: 1,
  paddingLeft: '40px',
  paddingRight: '40px',
});

export const StyledListItemIcon = styled(ListItemIcon)<{ active: boolean }>(({ active }) => ({
  color: active ? theme.colors.secondary_background_color : theme.colors.font_color_textfeild,
  minWidth: 'auto',
}));

export const StyledListItemText = styled(ListItemText)<{ active: boolean }>(({ active }) => ({
  color: active ? theme.colors.secondary_background_color : theme.colors.font_color_textfeild,
  fontWeight: active ? theme.fontweight.base_font_weight_Bold : theme.fontweight.base_font_weight_SemiBold,
  textAlign: 'left',
}));
