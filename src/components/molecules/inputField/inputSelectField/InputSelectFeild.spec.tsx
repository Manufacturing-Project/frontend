import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputSelectField } from './InputSelectField'; // Adjust the import based on your file structure
import { SelectChangeEvent } from '@mui/material';

describe('InputSelectField Component', () => {
  const mockOnChange = jest.fn(); // Mock function to test onChange
  const options = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('renders the InputSelectField with label and options', () => {
    render(
      <InputSelectField
        label="Select an option"
        options={options}
        value=""
        onChange={mockOnChange}
      />
    );

    // Check if the label is rendered
    expect(screen.getByText('Select an option')).toBeInTheDocument();

    // Check if options are rendered
    const selectElement = screen.getByRole('combobox'); // Change from 'button' to 'combobox'
    fireEvent.mouseDown(selectElement); // Open the select menu

    options.forEach(option => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  test('calls onChange function when an option is selected', () => {
    render(
      <InputSelectField
        label="Select an option"
        options={options}
        value="1"
        onChange={mockOnChange}
      />
    );
  
    // Open the select menu
    const selectElement = screen.getByRole('combobox');
    fireEvent.mouseDown(selectElement); // Open the select menu
  
    // Select an option
    fireEvent.click(screen.getByText('Option 2'));
  
    // Check if the onChange handler is called with the correct value
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    // expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '2' } }));
  });
  

//   test('renders with default width', () => {
//     const { container } = render(
//       <InputSelectField
//         label="Select an option"
//         options={options}
//         value=""
//         onChange={mockOnChange}
//       />
//     );

//     // Check if the select field has the default width
//     const selectElement = container.querySelector('div'); // Adjust selector to find the appropriate element
//     expect(selectElement).toHaveStyle('width: 340px');
//   });
});
