import { TextareaField } from './InputTextArea';

export default {
  title: 'Components/Atoms/Input Text Area',
  component: TextareaField,
  tags: ['autodocs'],
    argTypes: {
        label: {
        control: 'text',
        description: 'The label for the text area',
        },
        ariaLabel: {
        control: 'text',
        description: 'The aria label for the text area',
        },
        placeholder: {
        control: 'text',
        description: 'The placeholder for the text area',
        },
        value: {
        control: 'text',
        description: 'The value for the text area',
        },
    },
};

const Template = {
    args: {
        label: 'Text Area',
        ariaLabel: 'Text Area',
        placeholder: 'Enter some text here',
        
    },
    component: TextareaField,
};

export const Default = Template;