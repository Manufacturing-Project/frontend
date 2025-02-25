import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Table from './Table';

export default {
  title: 'Components/Molecules/Table',
  component: Table,
} as Meta;

const Template: StoryFn = () => <Table />;

export const Tables = Template.bind({});
Tables.args = {};
