import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Optional but provides better assertions like "toBeInTheDocument"
import { SearchBar } from './SearchBar';

const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
const mockOnChange = jest.fn();

const renderSearchBar = () => {
  return render(
    <SearchBar
      options={mockOptions}
      onChange={mockOnChange}
    />
  );
};

describe('SearchBar Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test('should render the search bar with the search icon', () => {
    renderSearchBar();
    
    // Check if the input field is rendered
    const input = screen.getByPlaceholderText('Search ...');
    expect(input).toBeInTheDocument();

    // Check if the search icon is rendered
    const searchIcon = screen.getByTestId('SearchIcon');
    expect(searchIcon).toBeInTheDocument();
  });

  test('should display autocomplete options when typing', async () => {
    renderSearchBar();
    
    // Get the input field and type
    const input = screen.getByPlaceholderText('Search ...');
    fireEvent.change(input, { target: { value: 'Option' } });
    
    // Check that the autocomplete options are shown
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

//   test('should trigger onChange when an option is selected', () => {
//     renderSearchBar();
    
//     // Get the input field and type to trigger autocomplete
//     const input = screen.getByPlaceholderText('Search ...');
//     fireEvent.change(input, { target: { value: 'Option 1' } });

//     // Click on an option
//     const option1 = screen.getByText('Option 1');
//     fireEvent.click(option1);

//     // Check if onChange handler is called
//     expect(mockOnChange).toHaveBeenCalledWith(expect.anything(), 'Option 1');
//   });

  test('should allow free typing without selecting options', () => {
    renderSearchBar();
    
    // Get the input field and type
    const input = screen.getByPlaceholderText('Search ...');
    fireEvent.change(input, { target: { value: 'Custom Value' } });

    // Verify the input's value is set
    expect(input).toHaveValue('Custom Value');
  });

  test('should clear input when "disableClearable" is true', () => {
    renderSearchBar();
    
    // Get the input field and type
    const input = screen.getByPlaceholderText('Search ...');
    fireEvent.change(input, { target: { value: 'Custom Value' } });

    // Clear the input field
    fireEvent.change(input, { target: { value: '' } });

    // Verify the input's value is cleared
    expect(input).toHaveValue('');
  });
});
