import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';
import { Category } from './Category'; // Adjust the import path if needed
import store from '../../../store'; // Adjust the import path if needed

export default {
  title: 'Components/Page/Category',
  component: Category,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as Meta<typeof Category>;

// Default template for Category
const Template: StoryFn<typeof Category> = (args) => <Category {...args} />;

export const Catego = Template.bind({});

