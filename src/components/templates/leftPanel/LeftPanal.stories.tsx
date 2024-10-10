import React from 'react';
import { Meta, StoryFn } from '@storybook/react'; // Ensure you have this import
import { LeftPanel } from './LeftPanal';

const meta: Meta = {
  title: 'Components/Templates/LeftPanel',
  component: LeftPanel,
};

export default meta;

const Template: StoryFn<{ location: string }> = (args) => (
  
    <LeftPanel />

);

export const DefaultRegister = Template.bind({});
DefaultRegister.args = {
  location: '/register/material', // Pass the default location here
};

export const DefaultSetting = Template.bind({});
DefaultSetting.args = {
  location: '/setting/unit', // Pass the setting location here
};
