import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ImageLeft } from './ImageLeft'; // Adjust the import path as necessary

// Meta information for the ImageLeft component stories
const meta: Meta = {
  title: 'Components/Atoms/ImageLeft',
  component: ImageLeft,
};

export default meta;

// Template for creating stories
const Template: StoryFn<{ src: string; alt: string }> = (args) => <ImageLeft {...args} />;

// Default story


// You can create more variations if needed
export const CustomImage = Template.bind({});
CustomImage.args = {
  src: 'https://via.placeholder.com/300x200', // Custom image source
  alt: 'Another placeholder image',
};
