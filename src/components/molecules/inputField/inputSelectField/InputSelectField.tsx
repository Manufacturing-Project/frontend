import React from "react";
import { Select, MenuItem, SelectChangeEvent, Box, Typography } from "@mui/material";
import theme from "../../../theme"; // Assuming your theme is defined here

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

// InputSelectField Component
interface Option {
  id: string;
  name: string;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  width?: string;
}

export const InputSelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  width = "340px",
}) => {
  return (
    <Box>
      <InputFieldLabel label={label} />
      <Select
  value={value}
  onChange={onChange}
  variant="outlined" // Add this line
  sx={{
    width: width,
    height: "50px",
    backgroundColor: "white",
        
  }}
>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

;
