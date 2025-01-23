import { InputTextField } from './InputTextField'

export default {
  title: 'Components/Molecules/InputField/InputTextField',
  component: InputTextField,
  tags: ['autodocs'],
    argTypes: {
        textPlaceholder: {
        control: 'text',
        description: 'The placeholder text for the input field',
        },
        label: {
        control: 'text',
        description: 'The label for the input field',
        }
    },
};

const Template = {
    args: {
        label: 'Text Field',
        textPlaceholder: 'Enter text here',
    },
    component: InputTextField,
};

export const Default = Template;