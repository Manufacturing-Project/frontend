import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../../theme";
import { StyledTextFieldProps } from "../../../../utils/types/molecules/styleProps/styleProps";

export const StyledInputLabel = styled(Typography)(() => ({
  fontWeight: theme.fontweight.base_font_weight_SemiBold,
  fontSize: theme.font.base_font_size_h4,
  marginBottom: "8px",
}));


export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "width" && prop !== "height",
})<StyledTextFieldProps>(({ width = "340px", height = "50px" }) => ({
  width,
  height,
  backgroundColor: "white",
  borderRadius: 8,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.colors.border_color_grey,
    },
    "&:hover fieldset": {
      borderColor: theme.colors.border_color_grey,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.colors.primary_color_green,
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: theme.colors.border_color_grey,
    opacity: 1,
  },
}));


