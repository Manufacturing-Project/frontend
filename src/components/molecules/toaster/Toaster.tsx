// Toaster.tsx

import { useState, forwardRef, useImperativeHandle } from 'react';
import { Snackbar } from '@mui/material';
import theme from '../../theme';

import { StyledAlert } from './Toaster.styled';
import { ToasterProps, ToasterRef, ToastType } from '../../../utils/types/molecules/props/toasterProps';

const Toaster = forwardRef<ToasterRef, ToasterProps>(({ duration = 3000 }, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');

  const handleShowToast = (msg: string, toastType: ToastType) => {
    setMessage(msg);
    setType(toastType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    showToast: handleShowToast,
  }));

  const getCustomColor = (toastType: ToastType) => {
    switch (toastType) {
      case 'error':
        return theme.colors.alert_error;
      case 'success':
        return theme.colors.alert_success;
      case 'warning':
        return theme.colors.alert_warning;
      default:
        return '';
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <StyledAlert
        onClose={handleClose}
        severity={type}
        bgcolor={getCustomColor(type)}
        fontcolor={theme.colors.secondary_background_color}
      >
        {message}
      </StyledAlert>
    </Snackbar>
  );
});

export default Toaster;
