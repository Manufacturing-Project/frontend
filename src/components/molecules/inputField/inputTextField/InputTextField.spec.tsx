// InputTextField.spec.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputTextField } from './InputTextField'; // Adjust the path as necessary

describe('InputTextField', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test('renders the label', () => {
    render(<InputTextField label="Username" textPlaceholder="Enter your username" value="" onChange={mockOnChange} />);

    const labelElement = screen.getByText(/Username/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders the text field with correct placeholder', () => {
    render(<InputTextField label="Username" textPlaceholder="Enter your username" value="" onChange={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText(/Enter your username/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange function when typing in the text field', () => {
    render(<InputTextField label="Username" textPlaceholder="Enter your username" value="" onChange={mockOnChange} />);
  
    const inputElement = screen.getByPlaceholderText(/Enter your username/i);
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
  
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object)); // Accept any object
   
  });
  
  
});
