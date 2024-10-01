/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { UnitOfMeasure } from './UnitOfMeasure'; // Adjust the import path as needed
import { Provider } from 'react-redux';
import { store } from '../../../store'; // Adjust the import path as needed
import { Meta, StoryFn } from '@storybook/react'; // Import Meta and Story types


export default {
  title: 'Components/page/UnitOfMeasure', // Change the title as appropriate
  component: UnitOfMeasure,
} as Meta;

// Define the Redux provider wrapper
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

// Template type definition
const Template: StoryFn<{ units: { id: string; name: string }[] }> = (arg) => (
  <ReduxProvider>
    <UnitOfMeasure />
  </ReduxProvider>  
);

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
