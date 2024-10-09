import React, { createRef } from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'; // Import act
import Toaster, { ToasterRef } from './Toaster'; // Adjust the import path as necessary

describe('Toaster Component', () => {
  let toasterRef: React.RefObject<ToasterRef>;

  beforeEach(() => {
    toasterRef = createRef<ToasterRef>();
    render(<Toaster ref={toasterRef} />);
  });

  test('renders without crashing', () => {
    expect(screen.queryByText(/success|error|warning/i)).not.toBeInTheDocument();
  });

  test('shows toast message when showToast is called', async () => {
    const message = 'This is a success message';
    
    // Wrap showToast in act
    await act(async () => {
      toasterRef.current?.showToast(message, 'success');
    });

    // Wait for the toast message to appear
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    // Use getByRole to directly select the alert element
    const alert = screen.getByRole('alert'); // Ensures it's an alert

    // Check that the alert has the correct severity and attributes
    expect(alert).toHaveTextContent(message);

    // Check the correct style (depending on your theme setup, adjust if needed)
    expect(alert).toHaveStyle('background-color:rgb(46, 125, 50)');
  });

  test('closes toast message after specified duration', async () => {
    jest.useFakeTimers(); // Use fake timers to control time in tests
    const message = 'This is a temporary message';
    
    // Wrap showToast in act
    await act(async () => {
      toasterRef.current?.showToast(message, 'success');
    });

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    // Advance timers by the default duration (3000ms)
    jest.advanceTimersByTime(3000);

    // Wait for the toast to be removed after the duration
    await waitFor(() => {
      expect(screen.queryByText(message)).not.toBeInTheDocument();
    });

    jest.useRealTimers(); // Restore real timers
  });

  test('closes toast message when close button is clicked', async () => {
    const message = 'This is a closable message';
    
    // Wrap showToast in act
    await act(async () => {
      toasterRef.current?.showToast(message, 'success');
    });

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    // Simulate clicking the close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Wait for the toast message to disappear after close button click
    await waitFor(() => {
      expect(screen.queryByText(message)).not.toBeInTheDocument();
    });
  });
});
