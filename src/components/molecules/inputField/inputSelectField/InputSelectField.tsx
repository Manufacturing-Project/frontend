import React from "react";
import { Select, MenuItem, FormHelperText } from "@mui/material";
import {
  StyledContainer,
  StyledFormControl,
  selectFieldStyles,
} from "./InputSelectField.styles";
import { InputFieldLabel } from "../inputTextField/InputTextField";
import { SelectFieldProps } from "../../../../utils/types/molecules/props/inputSelectFieldProps";

export const InputSelectField: React.FC<SelectFieldProps> = ({
  label,
  height,
  options,
  value,
  name,
  onChange,
  error,
  helperText,
  id,
  type,
  required = false,
  width = "100%",
}) => {
  return (
    <StyledContainer>
      <InputFieldLabel label={label} />
      <StyledFormControl width={width} error={error}>
        <Select
          value={value}
          name={name}
          id={id}
          onChange={onChange}
          sx={selectFieldStyles(width, height)}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </StyledFormControl>
    </StyledContainer>
  );
};

