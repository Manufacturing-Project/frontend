

import {MenuBar} from './MenuBar';
import { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof MenuBar> = {
  title: 'Components/Molecules/MenuBar',
  component: MenuBar,
  parameters: {
    docs: {
      description: {
        component: 'The MenuBar component displays navigation items with icons.',
      },
    },
    layout: 'fullscreen', // Optional: Adjust as needed
  },
};

export default meta;

type Story = StoryObj<typeof MenuBar>;

export const Default: Story = {
  args: {},
};




