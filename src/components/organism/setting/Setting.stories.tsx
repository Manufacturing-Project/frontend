// src/components/organism/CommonItemPage.stories.tsx
import React from 'react';
import Setting from './Setting';
import { Meta, StoryFn } from '@storybook/react'; 

// Mocked functions to simulate API calls
const createItemMock = async (name: string) => {
  console.log(`Creating item: ${name}`);
};

const updateItemMock = async (id: string, name: string) => {
  console.log(`Updating item ${id} to name: ${name}`);
};

const deleteItemMock = async (id: string) => {
  console.log(`Deleting item with id: ${id}`);
};

// Mock data for the story
const mockItems = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

export default {
  title: 'Components/CommonItemPage',
  component: Setting,
} as Meta;

const Template: StoryFn = (args) => <Setting title={''} items={[]} buttonName={''} createItem={function (name: string): Promise<void> {
    throw new Error('Function not implemented.');
} } updateItem={function (id: string, name: string): Promise<void> {
    throw new Error('Function not implemented.');
} } deleteItem={function (id: string): Promise<void> {
    throw new Error('Function not implemented.');
} } {...args} />; 

export const DefaultView = Template.bind({});
DefaultView.args = {
  title: 'Units of Measure',
  buttonName: 'Unit',
  items: mockItems,
  createItem: createItemMock,
  updateItem: updateItemMock,
  deleteItem: deleteItemMock,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  title: 'Units of Measure',
  buttonName: 'Unit',
  items: [],
  createItem: createItemMock,
  updateItem: updateItemMock,
  deleteItem: deleteItemMock,
};
