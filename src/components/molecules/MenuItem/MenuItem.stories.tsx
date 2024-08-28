import { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';// Adjust the import path as needed
import DashboardIcon from '../../../assets/Dashboard.png'; // Import as a React component if SVG

const meta: Meta<typeof MenuItem> = {
  title: 'Components/Molecules/MenuItem',
  component: MenuItem,
  parameters: {
    docs: {
      description: {
        component: 'The MenuItem component displays a menu item with an icon and a label.',
      },
    },
    layout: 'centered', // Optional: Adjust as needed
  },
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    icon: DashboardIcon, // Pass the URL directly
    label: 'Dashboard',
  },
};

export const Active: Story = {
  args: {
    icon: DashboardIcon, // Use an img tag for PNG
    label: 'Dashboard',
    isActive: true,
  },
};
