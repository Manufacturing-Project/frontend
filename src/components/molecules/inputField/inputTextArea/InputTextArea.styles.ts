import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import theme from "../../../theme";

export const StyledTextAreaWrapper = styled(Box)(() => ({
  '& textarea::placeholder': {
    color: theme.colors.border_color_grey,
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
}));

export const StyledTextArea = styled('textarea')(() => ({
  width : "100%",
  minHeight: "200px",
  marginRight: "10px",
  borderRadius: "4px",
  border: `1px solid ${theme.colors.border_color_grey}`,
  transition: 'border-color 0.3s',
  outline: 'none',
  padding: '8px',
  fontFamily: 'sans-serif',
  fontSize: '14px',
  resize: 'vertical',
  '&:focus': {
    borderColor: theme.colors.primary_color_green,
  },
}));

export const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const StyledLabel = styled(Typography)(() => ({
  fontWeight: theme.fontweight.base_font_weight_SemiBold,
  fontSize: theme.font.base_font_size_h4,
  marginBottom: "8px",
}));
