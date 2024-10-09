import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // For testing routing behavior
import { Logo } from './Logo'; // Adjust the path according to your project structure

describe('Logo Component', () => {
  test('renders the logo image with the correct src and alt attributes', () => {
    render(
      <MemoryRouter> {/* Wrapping with MemoryRouter for Link component */}
        <Logo />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('Logo');
    
    // Check if the image is in the document
    expect(logo).toBeInTheDocument();

    // Verify the image's src attribute (you can modify the src check according to your file structure)
    expect(logo).toHaveAttribute('src', expect.stringContaining('LogoOriginal 1.png'));
    
    // Verify the image's alt text
    expect(logo).toHaveAttribute('alt', 'Logo');
  });

//   test('navigates to /dashboard when clicked', () => {
//     render(
//       <MemoryRouter>
//         <Logo />
//       </MemoryRouter>
//     );

//     const link = screen.getByRole('link');
    
//     // Check if the link navigates to /dashboard
//     expect(link).toHaveAttribute('href', '/dashboard');
//   });
});
