import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from '../src/store';
import React from "react";
import { MemoryRouter } from "react-router-dom";

const withProvider = (Story: any, context: any) => (
  
    <MemoryRouter>
      <Provider store={store}>
        <Story {...context} />
      </Provider>
    </MemoryRouter>
  
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withProvider],
};

export default preview;
