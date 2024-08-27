import { Meta, StoryObj } from '@storybook/react';
import { CustomButton } from './CustomButton';


const meta: Meta<typeof CustomButton> = {
  title: 'Components/CustomButton', // Changed title to make it unique
  component: CustomButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: () => {} },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary',
    
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Secondary Button',
    
  },
};

export const Logout: Story = {
  args: {
    primary: false,
    label: 'Logout',
   
  },
};

