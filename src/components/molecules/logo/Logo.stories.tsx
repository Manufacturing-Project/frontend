
import { Logo } from "./Logo";

const meta = {
  title: 'Components/Molecules/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    width: {
      description: 'Width of the logo',
      control: 'text',
    },
    height: {
      description: 'Height of the logo',
      control: 'text',
    },
    altText: {
      description: 'Alternative text for the logo image',
      control: 'text',
    },
    href: {
      description: 'URL to navigate to when the logo is clicked',
      control: 'text',
    },
    onClick: {
      description: 'Optional click handler if the logo needs to be interactive',
      control: 'none',  // No control for functions
    },
    className: {
      description: 'Additional class name for custom styling',
      control: 'text',
    },
    src: {
      description: 'Custom image source if different logos are needed',
      control: 'text',
    },
  },
};

export default meta;

const Template = {
    args: {
        width: '90px',
        height: '90px',
    },
};

export const Default = Template;