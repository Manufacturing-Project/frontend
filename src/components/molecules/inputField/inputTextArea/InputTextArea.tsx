import React from "react";
import { StyledLabel } from "./InputTextArea.styles";
import { LabelProps } from "../../../../utils/types/molecules/props/inputFieldProps";
import {
  StyledTextArea,
  StyledTextAreaWrapper,
  StyledContainer,
} from "./InputTextArea.styles";
import { TextareaFieldProps } from "../../../../utils/types/molecules/props/inputTextAreaProps";

export const InputTextArea: React.FC<TextareaFieldProps> = ({
  label,
  ariaLabel,
  minRows = 15,
  placeholder,
  value,
  name,
  id,
  error,
  helperText,
  onBlur,
  onChange,
}) => {
  return (
    <StyledContainer>
      <InputFieldLabel label={label} />
      <StyledTextAreaWrapper>
        <StyledTextArea
          aria-label={ariaLabel}
          placeholder={placeholder}
          value={value}
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
      </StyledTextAreaWrapper>
    </StyledContainer>
  );
};



export const InputFieldLabel: React.FC<LabelProps> = ({ label }) => {
  return <StyledLabel variant="h4">{label}</StyledLabel>;
};
