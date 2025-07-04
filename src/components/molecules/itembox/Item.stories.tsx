import React from 'react';
import { Itembox } from './ItemDisplayBox'; // Adjust the import path as needed
import { Provider } from 'react-redux';
import { store } from '../../../store'; // Adjust the import path as needed
import { Meta, StoryFn } from '@storybook/react'; // Import Meta and StoryFn types
import { ItemboxProps } from '../../../utils/types/molecules/props/itemBoxProps'; // Adjust the import path as needed
export default {
  title: 'Components/Molecules/Itembox', // Title for the Storybook UI
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
];

// Default story with sample data
export const Default = Template.bind({});
Default.args = {
  items: sampleItems,
  color: '#333',
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
