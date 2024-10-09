import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableCells } from './TableCells';

describe('TableCells Component', () => {
  test('renders value as text when not an image and no format is provided', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCells value="Test Value" columnIndex={1} />
          </tr>
        </tbody>
      </table>
    );

    // Verify that the text is displayed
    const textElement = screen.getByText('Test Value');
    expect(textElement).toBeInTheDocument();
  });

  test('renders formatted value when format function is provided', () => {
    const formatFunction = (value: number) => `Formatted ${value}`;
    
    render(
      <table>
        <tbody>
          <tr>
            <TableCells value={100} format={formatFunction} columnIndex={1} />
          </tr>
        </tbody>
      </table>
    );

    // Verify that the formatted value is displayed
    const formattedElement = screen.getByText('Formatted 100');
    expect(formattedElement).toBeInTheDocument();
  });

  test('renders an image when isImage is true', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCells value="image-url.jpg" isImage={true} columnIndex={1} />
          </tr>
        </tbody>
      </table>
    );

    // Verify that the image is displayed
    const imageElement = screen.getByAltText('Material');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'image-url.jpg');
  });

//   test('applies correct background color based on columnIndex', () => {
//     render(
//       <table>
//         <tbody>
//           <tr>
//             <TableCells value="Even Column" columnIndex={0} />
//             <TableCells value="Odd Column" columnIndex={1} />
//           </tr>
//         </tbody>
//       </table>
//     );

//     // Verify the background color for the even column
//     const evenColumnCell = screen.getByText('Even Column').closest('td');
//     expect(evenColumnCell).toHaveStyle(`background-color: rgb(239, 83, 80)`); // red[500]

//     // Verify the background color for the odd column
//     const oddColumnCell = screen.getByText('Odd Column').closest('td');
//     expect(oddColumnCell).toHaveStyle(`background-color: rgb(3, 169, 244)`); // lightBlue[500]
//   });
});
