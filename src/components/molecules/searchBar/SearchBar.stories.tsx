import {SearchBar}  from './SearchBar';

export default {
  title: 'Components/Atoms/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'array',
    },
    label: {
      control: 'text',
    },
  },
};

const Template = {
    args: {
        options: ['Option 1', 'Option 2', 'Option 3'],
        label: 'Search Raw Material',
    },
    component: SearchBar,
};

export const Default = Template;