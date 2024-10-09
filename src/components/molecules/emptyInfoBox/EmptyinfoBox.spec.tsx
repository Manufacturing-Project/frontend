import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmptyInfoBox from './EmptyInfoBox';

describe('EmptyInfoBox Component', () => {
  const mockButtonClick = jest.fn();

  test('renders the text and button with correct labels', () => {
    render(
      <EmptyInfoBox text="No data available" buttonText="Add Data" onButtonClick={mockButtonClick} />
    );

    // Check if the text is rendered
    const textElement = screen.getByText('No data available');
    expect(textElement).toBeInTheDocument();

    // Check if the button is rendered with the correct label
    const buttonElement = screen.getByText('Add Data');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onButtonClick function when button is clicked', () => {
    render(
      <EmptyInfoBox text="No data available" buttonText="Add Data" onButtonClick={mockButtonClick} />
    );

    // Find the button and click it
    const buttonElement = screen.getByText('Add Data');
    fireEvent.click(buttonElement);

    // Check if the click event triggers the onButtonClick handler
    expect(mockButtonClick).toHaveBeenCalledTimes(1);
  });

 
});
