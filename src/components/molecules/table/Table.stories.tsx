// src/components/common/CustomTable.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CustomTable from './Table';

const meta: Meta<typeof CustomTable> = {
  title: 'Components/Common/CustomTable',
  component: CustomTable,
};

export default meta;

type Story = StoryObj<typeof CustomTable>;

const columns = [
  { header: 'Material Name', accessor: 'materialName' },
  { header: 'Code', accessor: 'materialCode', align: 'right' as 'right' },
  { header: 'Unit', accessor: 'unitOfMeasure', align: 'right' as 'right' },
  { header: 'Description', accessor: 'description', align: 'right' as 'right' },
];

const rows = [
  {
    materialName: 'Iron Rod',
    materialCode: 'IR001',
    unitOfMeasure: 'Kg',
    description: 'High quality iron rod',
  },
  {
    materialName: 'Copper Wire',
    materialCode: 'CW002',
    unitOfMeasure: 'Meter',
    description: 'Conductive wire for electrical use',
  },
  {
    materialName: 'Aluminium Sheet',
    materialCode: 'AS003',
    unitOfMeasure: 'Sqft',
    description: 'Lightweight metal sheet',
  },
];

export const Default: Story = {
  args: {
    columns,
    rows,
  },
};
