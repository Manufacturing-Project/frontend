import React from "react";
import { Box, TextareaAutosize, Typography } from "@mui/material";
import theme from "../../../theme"; // Assuming your theme is defined here

// InputFieldLabel Component
interface LabelProps {
  label: string;
  name?: string;
  ariaLabel?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
  helperText?: string;
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
  name?: string;
  id?: string;
  //pe?: string;
  ariaLabel?: string;
  minRows?: number;
  placeholder: string;
  value: string;
  error?: boolean;
  helperText?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const InputTextArea: React.FC<TextareaFieldProps> = ({
  label,
  ariaLabel,
  minRows = 15,
  placeholder,
  value,
  name,
  id,
  //type,
  error,
  helperText,
  onBlur,
  onChange,
}) => {
  return (
    <Box>
      <InputFieldLabel label={label} />
     

      <Box sx={{
        '& textarea::placeholder': {
          color: theme.colors.border_color_grey,
          fontSize: 15,
          fontFamily: 'sans-serif'
        },
      }}>
        <TextareaAutosize
          aria-label={ariaLabel}
          minRows={minRows}
          placeholder={placeholder}
          value={value}
          id={id}
          name={name}
       // type={type}
          onChange={onChange}
          onBlur={onBlur}
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
          
        />
      </Box>
    </Box>
  );
};
