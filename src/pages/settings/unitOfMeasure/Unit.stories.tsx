/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { UnitOfMeasure } from './UnitOfMeasure'; 
import { StoryFn } from '@storybook/react'; 


export default {
  title: 'Components/Organisms/UnitOfMeasure', // Change the title as appropriate
  component: UnitOfMeasure,
  tags: ['autodocs', 'unit'],
  argTypes: {
    units: {
      control: {
        type: 'object',
      },
    },
  },
  }

  const Template: StoryFn = (args) => <UnitOfMeasure {...args} />;

// Sample data for the Itembox
const sampleUnits = [
  { id: '1', name: 'Kilogram' },
  { id: '2', name: 'Liter' },
  { id: '3', name: 'Meter' },
];

// Default story with sample data
export const Default = Template.bind({});
Default.args = { 
  units: sampleUnits // Passing the sample units to the UnitOfMeasure component
};
Default.storyName = 'Unit of Measure';
