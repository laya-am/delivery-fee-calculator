import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumOfItemsInput from '.';

const mockOnDataValidityChange = jest.fn();

describe('NumOfItemsInput', () => {
  it('renders without errors', () => {
    render(<NumOfItemsInput onDataValidityChange={mockOnDataValidityChange} />);
    expect(screen.getByTestId('numberOfItems')).toBeInTheDocument();
  });

  it('displays an error message when there is no value given', () => {
    render(<NumOfItemsInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('numberOfItems');

    fireEvent.blur(input);

    expect(screen.getByText('Please enter a valid whole number.')).toBeInTheDocument();
  });

  it('displays an error message when the value is invalid', () => {
    render(<NumOfItemsInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('numberOfItems');

    fireEvent.change(input, { target: { value: '5.5' } });
    fireEvent.blur(input);
    expect(screen.getByText('Please enter a valid whole number.')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '-5' } });
    fireEvent.blur(input);
    expect(screen.getByText('Please enter a valid whole number.')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.blur(input);
    expect(screen.getByText('Please enter a valid whole number.')).toBeInTheDocument();
  });

  it('does not display an error message when the value is valid', () => {
    render(<NumOfItemsInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('numberOfItems');

    fireEvent.change(input, { target: { value: '50' } });
    fireEvent.blur(input);

    expect(screen.queryByText('Please enter a valid number.')).toBeNull();
  });

  it('updates the inputValue state on input change', () => {
    render(<NumOfItemsInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('numberOfItems') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '30' } });

    expect(input.value).toBe('30');
  });
});
