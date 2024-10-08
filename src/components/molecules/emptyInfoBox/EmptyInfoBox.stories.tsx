import React from 'react';
import { Meta, StoryFn } from '@storybook/react'; // Correcting the import of Meta and StoryFn
import EmptyInfoBox, { EmptyInfoBoxProps } from './EmptyInfoBox';

export default {
  title: 'Components/Molecules/EmptyInfoBox',
  component: EmptyInfoBox,
  argTypes: {
    text: { control: 'text' },
    buttonText: { control: 'text' },
    onButtonClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<EmptyInfoBoxProps> = (args) => <EmptyInfoBox {...args} />;

export const Default = Template.bind({}); 
Default.args = {
  text: 'No variants have been added yet.',
  buttonText: 'Add New Variant',
};
