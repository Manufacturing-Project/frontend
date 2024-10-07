import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Toaster, { ToasterRef } from './Toaster';
import Button from '@mui/material/Button';

// Meta export to provide Storybook with component metadata
export default {
  title: 'Components/Molecules/Toaster', // Title for the Storybook sidebar
  component: Toaster,          // The actual component being used
  argTypes: {
    duration: {
      control: 'number', // Control the duration in the Storybook UI
      defaultValue: 3000,
      description: 'Duration for which the toast is visible',
    },
  },
} as Meta<typeof Toaster>;

// Story template function
const Template: StoryFn<typeof Toaster> = (args) => {
  const toasterRef = useRef<ToasterRef>(null);

  const handleShowToast = (type: 'success' | 'error'  | 'warning') => {
    if (toasterRef.current) {
      toasterRef.current.showToast(`This is a ${type} message!`, type);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => handleShowToast('success')}>
        Show Success Toast
      </Button>
      <Button variant="contained" color="error" onClick={() => handleShowToast('error')} style={{ marginLeft: '10px' }}>
        Show Error Toast
      </Button>
      <Button variant="contained" color="warning" onClick={() => handleShowToast('warning')} style={{ marginLeft: '10px' }}>
        Show Warning Toast
      </Button>

      {/* The Toaster component */}
      <Toaster ref={toasterRef} {...args} />
    </div>
  );
};

// Story instance with default behavior
export const Toasterstory = Template.bind({});
Toasterstory.args = {
  duration: 3000,
};
