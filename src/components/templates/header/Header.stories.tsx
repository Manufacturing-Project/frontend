import React from "react";
import { Header } from "./Header";
import { StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Organisms/Header",
  component: Header,
  tags: ["autodocs", "header"],
  argTypes: {
    searchOptions: {
      control: {
        type: "array",
      },
      defaultValue: ["Dashboard", "Registration", "Manufacture", "Setting"],
    },
    onSearchChange: {
      action: "search changed",
    },
  },
};

// Template for the story
const Template: StoryFn = (args) => <Header {...args} />;

// Default story export
export const Default = Template.bind({});
Default.args = {
  searchOptions: ["Dashboard", "Registration", "Manufacture", "Setting"],
  onSearchChange: action("search changed"),
};
