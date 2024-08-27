// src/components/atoms/switch/Switch.tsx

import React from 'react';
import Switch from '@mui/material/Switch';
import { Box } from '@mui/material';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
  className?: string;
}

export const CustomSwitch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  ariaLabel = 'Switch demo',
  className,
}) => {
  return (
    <Box>
      <Switch
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
        className={className}
      />
    </Box>
  );
};
