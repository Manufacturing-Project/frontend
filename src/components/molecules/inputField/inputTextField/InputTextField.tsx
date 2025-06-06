import React from "react";
import { Box } from "@mui/material";
import { StyledInputLabel, StyledTextField } from "./InputTextFielsd.styles";
import { InputFieldProps, LabelProps } from "../../../../utils/types/molecules/props/inputFieldProps";



export const InputTextField: React.FC<InputFieldProps> = ({
  label,
  textPlaceholder,
  width,
  height,
  value,
  onChange,
  onKeyDown,
  onBlur,
  error,
  helperText,
  type,
  name,
  id,
  required,
}) => (
  <Box>
    <StyledInputLabel>{label}</StyledInputLabel>
    <StyledTextField
      placeholder={textPlaceholder}
      value={value}
      name={name}
      id={id}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      type={type}
      width={width}
      height={height}
      variant="outlined"
    />
  </Box>
);




export const InputFieldLabel: React.FC<LabelProps> = ({ label }) => {
  return <StyledInputLabel variant="h4">{label}</StyledInputLabel>;
};
