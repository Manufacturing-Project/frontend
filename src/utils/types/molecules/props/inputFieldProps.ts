export interface InputFieldProps {
  label: string;
  textPlaceholder: string;
  width?: string;
  height?: string;
  value?: string | string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  type?: string;
  name?: string;
  id?: string;
   required?: boolean
}

export interface LabelProps {
  label: string;
}