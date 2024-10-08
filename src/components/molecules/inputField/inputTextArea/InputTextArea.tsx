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
      <Box sx={{
        '& textarea::placeholder': {
          color: theme.colors.border_color_grey,
          opacity: 1, // Show full opacity
        },
      }}>
        <TextareaAutosize
          aria-label={ariaLabel}
          minRows={minRows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "99%",
            marginRight: "10px",
            borderRadius: "4px",
            border: `1px solid ${theme.colors.border_color_grey}`, // Default border color
            transition: 'border-color 0.3s', // Smooth transition
            outline: 'none', // Remove default outline
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = theme.colors.primary_color_green; // Change border color on focus
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme.colors.border_color_grey; // Revert border color on blur
          }}
        />
      </Box>
    </Box>
  );
};
