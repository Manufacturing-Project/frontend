/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';
import { Category } from './Category'; // Adjust the import path as needed
import {store} from '../../../store'; // Adjust the import path as needed

export default {
  title: 'Pages/Settings/Category',
  component: Category,
  
} as Meta;


const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
// Template type definition for Category
const Template: StoryFn<{ categories: { id: string; name: string }[] }> = (args) => (
  <ReduxProvider>
      <Category  />
  </ReduxProvider>
  
);

// Sample data for the Category component
const sampleCategories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Furniture' },
  { id: '3', name: 'Clothing' },
];

// Default story with sample data
export const Default = Template.bind({});
Default.args = {
  categories: sampleCategories // Passing the sample categories to the Category component
};
Default.storyName = 'Category story';
