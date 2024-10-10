import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Product} from './pages/registration/ProductPage/Product'; // Adjust path based on your structure
 
// Mock the Lottie component
jest.mock('react-lottie', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="lottie-mock">Lottie Animation Mock</div>, // Mock output
  };
});
 
describe('Product Component', () => {
  test('renders without crashing', () => {
    render(<Product />); // Render the component
    // Assert that the mock is being rendered instead of the actual Lottie component
    expect(screen.getByTestId('lottie-mock')).toBeInTheDocument();
  });
});
 