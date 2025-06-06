import React from "react";
import { Select, MenuItem, SelectChangeEvent, Box, Typography, FormControl, FormHelperText } from "@mui/material";
import theme from "../../../theme"; // Assuming your theme is defined here
import { on } from "events";

// InputFieldLabel Component
interface LabelProps {
  label: string;
  name?: string
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

// InputSelectField Component
interface Option {
  id: string;
  name: string;
}

interface SelectFieldProps {
  label: string;
  name?: string;
  options: Option[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  width?: string;
  height?: string;
  error?: boolean;
  helperText?: string;
  id?: string;
  type?: string; // Added type property
  required?: boolean; // Added required property
}


      
export const InputSelectField: React.FC<SelectFieldProps> = ({
  label,
  height,
  options,
  value,
  name,
  onChange,
  error,
  helperText,
  type, // Added type for consistency
  required = false, // Default to false if not provided
  id,
  width = "340px",
}) => {

  const selectFieldStyles = {
    width: width,
    height: height, // Added height for consistency
    backgroundColor: "white",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor:  theme.colors.border_color_grey,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.colors.border_color_grey,
        borderWidth: "thin",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.colors.primary_color_green,
        borderWidth: "thin",
    },
};

  return (
    <Box>
      <InputFieldLabel label={label} />
      <FormControl
        sx={{ width: width }}
        error={error}
      >
        <Select
          value={value}
          name={name}
          onChange={onChange}
          sx={selectFieldStyles}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>

    </Box>
  );
};

;
