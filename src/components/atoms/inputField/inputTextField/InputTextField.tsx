import React from "react";
import { Box, TextField } from "@mui/material";
import { InputFieldLabel } from "../InputFieldLabel";

interface InputFieldProps {
  label : string;
  textPlaceholder: string;
  width?: string;
}

const InputTextField: React.FC<InputFieldProps> = ({
  label,
  textPlaceholder,
  width = "340px",
}) => {
  return (
    <Box>
      <InputFieldLabel label={label} />
      <TextField
        placeholder={textPlaceholder}
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
