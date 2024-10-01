import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LeftPanel } from './LeftPanal'; // Ensure the path is correct
import theme from '../../theme'; // Ensure the path is correct
import { ThemeProvider } from '@mui/material/styles';

// Meta configuration for Storybook
const meta: Meta<typeof LeftPanel> = {
  title: 'Components/Organisms/LeftPanel',
  component: LeftPanel,
  argTypes: {
    activeItem: {
      control: {
        type: 'select',
        options: ['Dashboard', 'Registration', 'Setting', 'Manufacture'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LeftPanel>;

// Default story for the LeftPanel component
export const Default: Story = {
  args: {
    activeItem: 'Registration',
  },
  render: (args) => (
    <ThemeProvider theme={theme}>
      <LeftPanel {...args} />
    </ThemeProvider>
  ),
};

// Story with the "Setting" item active
export const WithSettingActive: Story = {
  args: {
    activeItem: 'Setting',
  },
  render: (args) => (
    <ThemeProvider theme={theme}>
      <LeftPanel {...args} />
    </ThemeProvider>
  ),
};

// Story with the "Manufacture" item active
export const WithManufactureActive: Story = {
  args: {
    activeItem: 'Manufacture',
  },
  render: (args) => (
    <ThemeProvider theme={theme}>
      <LeftPanel {...args} />
    </ThemeProvider>
  ),
};

