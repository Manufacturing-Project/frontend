import React from "react";

export interface TextareaFieldProps {
  label: string;
  name?: string;
  id?: string;
  ariaLabel?: string;
  minRows?: number;
  placeholder: string;
  value: string;
  error?: boolean;
  helperText?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export interface LabelProps {
  label: string;
}
