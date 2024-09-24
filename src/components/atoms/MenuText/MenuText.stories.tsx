import { Meta, StoryObj } from '@storybook/react';
import {MenuText} from './MenuText'; // Adjust the import path as needed

const meta: Meta<typeof MenuText> = {
  title: 'Components/Atoms/MenuText',
  component: MenuText,
  parameters: {
    docs: {
      description: {
        component: 'The Menutext component displays a text label for menu items.',
      },
    },
    layout: 'centered', // Optional: Adjust as needed
  },
};

export default meta;

type Story = StoryObj<typeof MenuText>;

export const Default: Story = {
  args: {
    text: 'Example Text', // Example text, adjust as needed
  },
};
