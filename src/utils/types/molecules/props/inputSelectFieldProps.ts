import { SelectChangeEvent } from "@mui/material";

export interface Option {
  id: string;
  name: string;
}

export interface SelectFieldProps {
  label: string;
  name?: string;
  options: Option[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  width?: string;
  height?: string;
  error?: boolean;
  helperText?: string;
  id?: string;
  type?: string;
  required?: boolean;
}

export interface LabelProps {
  label: string;
}
