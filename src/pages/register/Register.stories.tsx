import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import {RegisterPage} from "../register/Register"; // Adjust the path as necessary
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../components/theme";

export default {
  title: "Pages/RegisterPage",
  component: RegisterPage,
} as Meta;

const Template: StoryFn = () => (
  <ThemeProvider theme={theme}>
    <RegisterPage />
  </ThemeProvider>
);

export const Default = Template.bind({});
