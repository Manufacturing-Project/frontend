// Toaster.tsx
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

type ToastType = AlertColor; // 'success' | 'error' | 'info' | 'warning'

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

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '400px'}}>
        {message}
      </Alert>
    </Snackbar>
  );
});

export default Toaster;
