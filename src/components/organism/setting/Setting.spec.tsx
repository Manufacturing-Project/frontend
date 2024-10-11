import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Setting} from './Setting'; // Adjust the import path

// Mocking functions passed as props
const mockCreateItem = jest.fn(() => Promise.resolve());
const mockUpdateItem = jest.fn(() => Promise.resolve());
const mockDeleteItem = jest.fn(() => Promise.resolve());

const sampleItems = [
  { id: '1', name: 'Sample Item 1' },
  { id: '2', name: 'Sample Item 2' },
];

describe('Setting Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Setting component with items', () => {
    render(
      <Setting
        title="Test Items"
        buttonName="Item"
        items={sampleItems}
        createItem={mockCreateItem}
        updateItem={mockUpdateItem}
        deleteItem={mockDeleteItem}
      />
    );

    expect(screen.getByText('Test Items')).toBeInTheDocument();
    expect(screen.getByText('Add New Item')).toBeInTheDocument();
    expect(screen.getByText('Sample Item 1')).toBeInTheDocument();
    expect(screen.getByText('Sample Item 2')).toBeInTheDocument();
  });

  test('opens dialog when Add New Item button is clicked', () => {
    render(
      <Setting
        title="Test Items"
        buttonName="Item"
        items={sampleItems}
        createItem={mockCreateItem}
        updateItem={mockUpdateItem}
        deleteItem={mockDeleteItem}
      />
    );

    const addButton = screen.getByText('Add New Item');
    fireEvent.click(addButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Add New Test Items')).toBeInTheDocument();
  });

  test('creates a new item successfully', async () => {
    render(
      <Setting
        title="Test Items"
        buttonName="Item"
        items={sampleItems}
        createItem={mockCreateItem}
        updateItem={mockUpdateItem}
        deleteItem={mockDeleteItem}
      />
    );

    const addButton = screen.getByText('Add New Item');
    fireEvent.click(addButton);

    const input = screen.getByLabelText('Test Items');
    fireEvent.change(input, { target: { value: 'New Item' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockCreateItem).toHaveBeenCalledWith('New Item');
    });

    expect(mockCreateItem).toHaveBeenCalledTimes(1);
  });

  test('does not create item with empty name and shows error', async () => {
    render(
      <Setting
        title="Test Items"
        buttonName="Item"
        items={sampleItems}
        createItem={mockCreateItem}
        updateItem={mockUpdateItem}
        deleteItem={mockDeleteItem}
      />
    );

    const addButton = screen.getByText('Add New Item');
    fireEvent.click(addButton);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockCreateItem).not.toHaveBeenCalled();
      expect(screen.getByText('Test Items name cannot be empty!')).toBeInTheDocument();
    });
  });

  test('updates an existing item successfully', async () => {
    render(
      <Setting
        title="Test Items"
        buttonName="Item"
        items={sampleItems}
        createItem={mockCreateItem}
        updateItem={mockUpdateItem}
        deleteItem={mockDeleteItem}
      />
    );

    const updateButton = screen.getAllByText('Update')[0]; // Assuming Update button exists for items
    fireEvent.click(updateButton);

    const input = screen.getByLabelText('Test Items');
    fireEvent.change(input, { target: { value: 'Updated Item' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateItem).toHaveBeenCalledWith('1', 'Updated Item');
    });

    expect(mockUpdateItem).toHaveBeenCalledTimes(1);
  });

  test('deletes an item successfully', async () => {
    render(
      <Setting
        title="Test Items"
        buttonName="Item"
        items={sampleItems}
        createItem={mockCreateItem}
        updateItem={mockUpdateItem}
        deleteItem={mockDeleteItem}
      />
    );

    const deleteButton = screen.getAllByText('Delete')[0]; // Assuming Delete button exists for items
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteItem).toHaveBeenCalledWith('1');
    });

    expect(mockDeleteItem).toHaveBeenCalledTimes(1);
  });
});
