import {InputSelectField} from './InputSelectField';

export default {
  title: 'Components/Molecules/InputSelectField',
  component: InputSelectField,
  tags: ['autodocs'],
    argTypes: {
        label: {
        control: 'text',
        description: 'The label for the select field',
        },
        options: {
        control: 'array',
        description: 'The options for the select field',
        },
        value: {
        control: 'text',
        description: 'The value for the select field',
        },
    },
};

const Template = {
    args: {
        label: 'Select',
        options: [
            { id: '1', name: 'Option 1' },
            { id: '2', name: 'Option 2' },
            { id: '3', name: 'Option 3' },
        ],
       
    },
    component: InputSelectField,
};

export const Default = Template;