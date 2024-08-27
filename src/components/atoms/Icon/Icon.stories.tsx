import { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon'; // Adjust the import path as needed

const meta: Meta<typeof Icon> = {
  title: 'Components/Atoms/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: 'The Icon component wraps a React node to display an icon.',
      },
    },
    layout: 'centered', // Optional: Adjust as needed
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: <span>⭐</span>, // Example icon, adjust as needed
  },
};
