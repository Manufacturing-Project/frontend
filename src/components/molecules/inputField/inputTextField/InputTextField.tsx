import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import theme from "../../../theme"; 
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

  required?: boolean; // Added required property
  id?: string;
  name?: string;

  
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;


}


// ...existing code...
interface InputFieldProps {
  label: string;
  textPlaceholder: string;
  width?: string;
  height?: string;
  value?: string | string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  id?: string;
  name?: string;
  type?: string; 
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; 
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean; // <-- Add this
  helperText?: string; // <-- Add this
}

export const InputTextField: React.FC<InputFieldProps> = ({
  label,
  textPlaceholder,
  width = "340px",
  height = "50px",
  value,
  onChange,
  onKeyDown,
  error,
  type, 
  name,
  onBlur,     // <-- Add this
  helperText,   // <-- Add this
}) => {
  return (
    <Box>
      <InputFieldLabel label={label} />
      <TextField
        placeholder={textPlaceholder}
        value={value}
        name={name}
        onChange={onChange}
        onKeyDown={onKeyDown}
        error={error}           // <-- Pass to TextField
        helperText={helperText} 
         type={type}
         onBlur={onBlur}
        sx={{
          width: width,
          height: height,
          backgroundColor: "white",
          borderRadius: 8,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.colors.border_color_grey,
            },
            '&:hover fieldset': {
              borderColor: theme.colors.border_color_grey,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.colors.primary_color_green,
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: theme.colors.border_color_grey,
            opacity: 1,
          },
        }}
        variant="outlined"
      />
    </Box>
  );
};
// ...existing code...