// Toaster.tsx
import  { useState, forwardRef, useImperativeHandle } from 'react';
import { Snackbar, Alert } from '@mui/material';
import theme from '../../theme';

type ToastType = 'success' | 'error' | 'warning';

interface ToasterProps {
  duration?: number;
}

export interface ToasterRef {
  showToast: (msg: string, toastType: ToastType) => void;
}

const Toaster = forwardRef<ToasterRef, ToasterProps>(({ duration = 3000 }, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');

  const handleShowToast = (message: string, toastType: ToastType) => {
    setMessage(message);
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
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{
          width: '400px',
          backgroundColor: getCustomColor(type) || undefined,
          color: theme.colors.secondary_background_color, 
        }}
      >
        {message} 
      </Alert>
    </Snackbar>
  );
});

export default Toaster;
