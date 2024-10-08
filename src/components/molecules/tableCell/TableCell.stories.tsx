import { TableCells } from './TableCells';

export default {
  title: 'Components/Molecules/TableCell',
  component: TableCells,
  tags: ['autodocs'],
  argstype: {
    
    value: {
      description: 'Value to be displayed in the cell',
      control: 'text',
    },
    format: {
      description: 'Function to format the value',
      control: 'text',
    },
    isImage: {
      description: 'Whether the value is an image or not',
      control: 'boolean',
    },
    columnIndex: {
      description: 'Index of the column',
      control: 'number',
    },
  },
};
const Template = {
    args: {
        value: 'Paper',
        format: (value: any) => value,
        isImage: false,
        columnIndex: 3,
    },
};

export const Default = Template;