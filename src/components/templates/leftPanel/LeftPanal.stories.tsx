import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { LeftPanel } from './LeftPanal'; // Adjust the import path as necessary
import { Provider } from 'react-redux';
import store from '../../../store'; // Adjust the import path as necessary

export default {
  title: 'Components/Organisms/LeftPanel', // The title under which the story will be listed
  component: LeftPanel,
  decorators: [
    (Story) => (
      <Provider store={store}>
        {/* No need for MemoryRouter here as it's already in preview.ts */}
        <Story />
      </Provider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <LeftPanel />;

// You can create multiple stories if needed
export const Panel = Template.bind({});
Panel.args = {
  path: '/register',
};
