import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import theme from "../../../theme"; // Ensure your theme path is correct
import { string } from "prop-types";

// InputFieldLabel Component
interface LabelProps {
  label: string;
}

const InputFieldLabel: React.FC<LabelProps> = ({ label }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: theme.fontweight.base_font_weight_SemiBold,
        fontSize: theme.font.base_font_size_h4,
        marginBottom: "8px",
      }}
    >
      {label}
    </Typography>
  );
};

// InputTextField Component
interface InputFieldProps {
  label: string;
  textPlaceholder: string;
  width?: string;
  height?: string;
  value?: string | string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

}

export const InputTextField: React.FC<InputFieldProps> = ({
  label,
  textPlaceholder,
  width = "340px",
  height = "50px",
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <Box>
      <InputFieldLabel label={label} />
      <TextField
        placeholder={textPlaceholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        sx={{
          width: width,
          height: height,
          backgroundColor: "white",
          borderRadius: 8,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.colors.border_color_grey, // Default border color
            },
            '&:hover fieldset': {
              borderColor: theme.colors.border_color_grey, // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.colors.primary_color_green, // Border color when focused
            },
          },
          // Adding placeholder color
          '& .MuiInputBase-input::placeholder': {
            color: theme.colors.border_color_grey, // Set your desired placeholder color
            opacity: 1, // Show full opacity
          },
        }}
        variant="outlined" // You can adjust the variant as needed
      />
    </Box>
  );
};
