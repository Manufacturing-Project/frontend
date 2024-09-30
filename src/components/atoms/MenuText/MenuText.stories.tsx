import { MenuText } from "./MenuText"

export default {
  title: 'Components/Atoms/MenuText',
  component: MenuText,
  tags: ['autodocs'],
    argTypes: {
        text: {
        control: 'text',
        description: 'The label for the input field',
        }
    },
};

const Template = {
    args: {
      text: 'Text Field',
    },
    component: MenuText,
};

export const Default = Template;
