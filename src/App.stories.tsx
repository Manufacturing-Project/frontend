import React from 'react';
import { StoryFn } from '@storybook/react';
import App from './App'; // Import your App component

export default {
  title: 'App/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template: StoryFn = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {};
