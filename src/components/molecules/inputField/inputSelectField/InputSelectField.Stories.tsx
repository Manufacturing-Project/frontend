import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { InputSelectField } from './InputSelectField';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';
import { Label } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material';

export default {
  title: 'Components/Molecules/InputField/InputSelectField',
  component: InputSelectField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the select field',
    },
    options: {
      control: 'object',
      description: 'Array of options to be displayed in the select field',
    },
    value: {
      control: 'text',
      description: 'The selected value of the select field',
    },
    onChange: {
      action: 'changed',
      description: 'Function to handle value changes',
    },
    width: {
      control: 'text',
      description: 'The width of the select field',
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
    <InputSelectField label={''} options={[]} value={''} onChange={function (event: SelectChangeEvent<string>): void {
            throw new Error('Function not implemented.');
        } } {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Select Field',
  options: [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3' },
  ],
  value: '',
  onChange: (event: { target: { value: any; }; }) => console.log('Selected value:', event.target.value),
  width: '340px',
};
