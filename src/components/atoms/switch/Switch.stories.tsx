import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CustomSwitch, SwitchProps } from './Switch';
import { SelectChangeEvent } from '@mui/material/Select';


const meta: Meta<typeof CustomSwitch> = {
  title: 'Components/Atoms/Switch',
  component: CustomSwitch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: 'Whether the switch is checked',
      control: 'boolean',
    },
    onChange: {
      description: 'Callback function fired when the switch is toggled',
      control: false, // Disable control for function types
    },
    ariaLabel: {
      description: 'Label for accessibility',
      control: 'text',
    },
    className: {
      description: 'Additional class name for custom styling',
      control: 'text',
    },
  },
};

export default meta;

const Template: StoryFn<SwitchProps> = (args) => <CustomSwitch {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  onChange: (event: SelectChangeEvent<string>) => {
    console.log('Switch toggled:', event.target.value);
  },
  ariaLabel: 'Switch demo',
};
