import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { FullLogo } from '../fullLogo/FullLogo';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

export default {
  title: 'Components/Organism/FullLogo',
  component: FullLogo,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <FullLogo />;

export const Default = Template.bind({});