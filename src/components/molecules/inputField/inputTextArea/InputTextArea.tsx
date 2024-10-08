import React from "react";
import { Box, TextareaAutosize, Typography } from "@mui/material";
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

// TextareaField Component
interface TextareaFieldProps {
  label: string;
  ariaLabel: string;
  minRows?: number;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputTextArea: React.FC<TextareaFieldProps> = ({
  label,
  ariaLabel,
  minRows = 15,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Box>
      <InputFieldLabel label={label} />
      <TextareaAutosize
        aria-label={ariaLabel}
        minRows={minRows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "99%", 
          borderRadius: "4px",
          borderColor: "#ccc",
        }}
      />
    </Box>
  );
};

;
