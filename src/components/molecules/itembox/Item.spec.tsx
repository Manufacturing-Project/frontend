import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For better assertion messages
import { Itembox } from './ItemDisplayBox'; // Adjust the path accordingly
import { ItemboxProps } from '../../../utils/types/molecules/props/itemBoxProps';

// Mock theme, as it might be used inside your component
jest.mock('../../theme', () => ({
  colors: {
    button_background_Logout: '#FF0000', // Example color
  },
}));

describe('Itembox Component', () => {
  const items = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
  ];

  const setup = (overrideProps?: Partial<ItemboxProps>) => {
    const defaultProps: ItemboxProps = {
      items,
      color: '#000',
      height: '200px',
      rowPadding: '10px',
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      ...overrideProps,
    };

    return render(<Itembox {...defaultProps} />);
  };

  test('renders item names correctly', () => {
    setup();

    // Check if the item names are rendered
    items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test('calls onDelete when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    setup({ onDelete: onDeleteMock });

    // Find delete button for the first item and click it
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    // Verify the delete function was called for the correct item
    expect(onDeleteMock).toHaveBeenCalledWith('1');
  });

  test('allows editing an item name', async () => {
    setup();

    // Find edit button for the first item and click it
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    // Check if input field appears with the correct value
    const inputField = screen.getByPlaceholderText(/edit item name/i);
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('Item 1');

    // Simulate user typing a new value
    fireEvent.change(inputField, { target: { value: 'Updated Item 1' } });
    expect(inputField).toHaveValue('Updated Item 1');
  });

  test('calls onUpdate when save button is clicked after editing', async () => {
    const onUpdateMock = jest.fn();
    setup({ onUpdate: onUpdateMock });

    // Find edit button for the first item and click it
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    // Simulate updating the name in the input field
    const inputField = screen.getByPlaceholderText(/edit item name/i);
    fireEvent.change(inputField, { target: { value: 'Updated Item 1' } });

    // Click the save button
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Verify that the update function was called with the correct arguments
    expect(onUpdateMock).toHaveBeenCalledWith('1', 'Updated Item 1');
  });

  test('cancels editing when cancel button is clicked', async () => {
    setup();

    // Find edit button for the first item and click it
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    // Simulate updating the name in the input field
    const inputField = screen.getByPlaceholderText(/edit item name/i);
    fireEvent.change(inputField, { target: { value: 'Updated Item 1' } });

    // Click the cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Ensure that the item is no longer in edit mode and the input is not displayed
    expect(screen.queryByPlaceholderText(/edit item name/i)).not.toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});
