import React from "react";
import { Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import { InputFieldLabel } from "../InputFieldLabel";

interface Option {
  id: string;
  name: string;
}

interface SelectFieldProps {
  label: string;
  options?: Option[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  width?: string;
}

const InputSelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  width = "300px",
}) => {
  return (
    <Box>
      <InputFieldLabel label={label} />
      <Select value={value} onChange={onChange} sx={{ width: width }}>
        {options?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export { InputSelectField };
