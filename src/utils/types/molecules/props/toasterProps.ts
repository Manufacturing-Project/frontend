// Toaster.props.ts

export type ToastType = 'success' | 'error' | 'warning';

export interface ToasterProps {
  duration?: number;
}

export interface ToasterRef {
  showToast: (msg: string, toastType: ToastType) => void;
}
