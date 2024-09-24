import React from "react";
import { Box, TextField } from "@mui/material";
import { InputFieldLabel } from "../InputFieldLabel";

interface InputFieldProps {
  label : string;
  textPlaceholder: string;
  width?: string;
  value: string | number;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTextField: React.FC<InputFieldProps> = ({
  label,
  textPlaceholder,
  width = "340px",
  value,
  onchange,
}) => {
  return (
    <Box
      sx={{
        height: "84px",
      }}
    >
      <InputFieldLabel label={label} />
      <TextField
        placeholder={textPlaceholder}
        value={value}
        onChange={onchange}
        sx={{
          width: width,
          height: "40px",
          backgroundColor: "white",
          borderRadius: 8,
        }}
      />
    </Box>
  );
};

export { InputTextField };
