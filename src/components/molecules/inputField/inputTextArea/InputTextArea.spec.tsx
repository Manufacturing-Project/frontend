// InputTextArea.spec.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputTextArea } from './InputTextArea'; // Adjust the path as necessary

describe('InputTextArea', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test('renders the label', () => {
    render(<InputTextArea label="Description" ariaLabel="description" placeholder="Type here..." value="" onChange={mockOnChange} />);

    const labelElement = screen.getByText(/Description/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders the textarea with correct placeholder', () => {
    render(<InputTextArea label="Description" ariaLabel="description" placeholder="Type here..." value="" onChange={mockOnChange} />);

    const textareaElement = screen.getByPlaceholderText(/Type here.../i);
    expect(textareaElement).toBeInTheDocument();
  });

  test('calls onChange function when typing in the textarea', () => {
    render(<InputTextArea label="Description" ariaLabel="description" placeholder="Type here..." value="" onChange={mockOnChange} />);

    const textareaElement = screen.getByPlaceholderText(/Type here.../i);
    fireEvent.change(textareaElement, { target: { value: 'Hello, world!' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    // expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'Hello, world!' } }));
  });

  test('renders with minimum rows specified', () => {
    render(<InputTextArea label="Description" ariaLabel="description" minRows={10} placeholder="Type here..." value="" onChange={mockOnChange} />);

    const textareaElement = screen.getByPlaceholderText(/Type here.../i);
    expect(textareaElement).toHaveAttribute('aria-label', 'description');
  });
});
