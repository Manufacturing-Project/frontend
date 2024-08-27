import { Typography } from '@mui/material';
import React from 'react';
import theme from '../../theme';

interface Props {
  label : string;
}

const InputFieldLabel: React.FC<Props> = ({label}) => {
  return (
    <Typography variant="h4" sx={{ fontWeight: theme.fontweight.base_font_weight_SemiBold, fontSize: theme.font.base_font_size_h4, marginBottom: '8px' }}>
        {label}
    </Typography>
  );
};

export { InputFieldLabel };