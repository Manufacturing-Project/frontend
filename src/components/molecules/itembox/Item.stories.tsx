import React from 'react';
import { Itembox, ItemboxProps } from './Itembox'; // Adjust the import path as needed
import { Provider } from 'react-redux';
import { store } from '../../../store'; // Adjust the import path as needed
import { Meta, StoryFn } from '@storybook/react'; // Import Meta and StoryFn types

export default {
  title: 'Components/Atoms/Itembox', // Title for the Storybook UI
  component: Itembox,
} as Meta;

// A wrapper function to include the Redux provider
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

// Template for the Itembox story
const Template: StoryFn<ItemboxProps> = (args) => (
  <ReduxProvider>
    <Itembox {...args} />
  </ReduxProvider>
); 

// Sample data for the Itembox
const sampleItems = [
  { id: '1', name: 'Kilogram' },
  { id: '2', name: 'Liter' },
  { id: '3', name: 'Meter' },
];

// Default story with sample data
export const Default = Template.bind({});
Default.args = {
  items: sampleItems,
  backgroundColor: '#f9f9f9',
  color: '#333',
  width: '400px',
  height: 'auto',
  rowPadding: '12px',
  onUpdate: async (id: string, updatedName: string) => {
    console.log(`Updated item ${id} to ${updatedName}`);
  },
  onDelete: async (id: string) => {
    console.log(`Deleted item with id ${id}`);
  },
};

Default.storyName = 'Default Itembox';
