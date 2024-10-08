import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import theme from "../../../theme"; // Ensure your theme path is correct

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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputTextField: React.FC<InputFieldProps> = ({
  label,
  textPlaceholder,
  width = "340px",
  value,
  onChange,
}) => {
  return (
    <Box>
      <InputFieldLabel label={label} />
      <TextField
        placeholder={textPlaceholder}
        value={value}
        onChange={onChange}
        sx={{
          width: width,
          height: "50px",
          backgroundColor: "white",
          borderRadius: 8,
        }}
        variant="outlined" // You can adjust the variant as needed
      />
    </Box>
  );
};
