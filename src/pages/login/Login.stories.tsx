import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {LoginPage} from '../login/Login';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../components/theme';

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
  
} as Meta;

const Template: StoryFn = () => <LoginPage />;

export const Default = Template.bind({});
