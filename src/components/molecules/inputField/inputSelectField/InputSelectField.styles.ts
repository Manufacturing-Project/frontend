import { styled } from "@mui/material/styles";
import { Typography, FormControl, Box } from "@mui/material";
import theme from "../../../theme";

export const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const StyledLabel = styled(Typography)(() => ({
  fontWeight: theme.fontweight.base_font_weight_SemiBold,
  fontSize: theme.font.base_font_size_h4,
  marginBottom: "8px",
}));

export const StyledFormControl = styled(FormControl)<{ width?: string }>(
  ({ width }) => ({
    width: width || "340px",
  })
);

export const selectFieldStyles = (width: string, height?: string) => ({
  width,
  height,
  backgroundColor: "white",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: theme.colors.border_color_grey,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.colors.border_color_grey,
    borderWidth: "thin",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.colors.primary_color_green,
    borderWidth: "thin",
  },
});
