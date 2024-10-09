import { MenuItem } from './MenuItem';
import { Meta, StoryObj } from '@storybook/react';
import DashboardIcon from '@mui/icons-material/Dashboard';

import theme from '../../theme'; // Assuming your theme is imported from here

// Define the meta configuration for MenuItem stories
const meta: Meta<typeof MenuItem> = {
  title: 'Components/Molecules/MenuItem', // Categorize this under Atoms
  component: MenuItem,
  parameters: {
    docs: {
      description: {
        component: 'MenuItem component renders an icon and label, with navigation support via React Router.',
      },
    },
    layout: 'centered', // Optional: Adjust layout based on how you want to display the component
  },
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

// Story for Dashboard MenuItem
export const Dashboard: Story = {
  args: {
    icon: <DashboardIcon sx={{ color: theme.colors.black_Transparent_8 }} />,
    label: 'Dashboard',
    path: '/dashboard',
  },
};




