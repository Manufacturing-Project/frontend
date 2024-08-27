import React from "react";
import { Box, TextareaAutosize } from "@mui/material";
import { InputFieldLabel } from "../InputFieldLabel";

interface TextareaFieldProps {
  label: string;
  ariaLabel: string;
  minRows?: number;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  ariaLabel,
  minRows = 3,
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
          width: "592px",
          padding: "10px",
          borderRadius: "4px",
          borderColor: "#ccc",
        }}
      />
    </Box>
  );
};

export { TextareaField };
