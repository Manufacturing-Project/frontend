import React from 'react';
import { StyledEmptyInfoBox , StyledButton , StyledTypography} from './EmptyInfoBox.Styled';
import {EmptyInfoBoxProps} from '../../../utils/types/molecules/props/emptyInfoBoxProps';

const EmptyInfoBox: React.FC<EmptyInfoBoxProps> = ({ text, buttonText, onButtonClick }) => {
  return (
    <StyledEmptyInfoBox>
     <StyledTypography>
      {text}  
      </StyledTypography>
      <StyledButton
        onClick={onButtonClick}>
        {buttonText}
      </StyledButton>
    </StyledEmptyInfoBox>
  );
};

export default EmptyInfoBox;
