import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartValueInput from '.';
 
  const mockOnDataValidityChange = jest.fn();

describe('CartValueInput', () => {
  it('renders without errors', () => {
    render(<CartValueInput onDataValidityChange={mockOnDataValidityChange} />);
    expect(screen.getByLabelText(/cart Value/i)).toBeInTheDocument();
  });

  it('displays an error message when there is no value given', () => {
    render(<CartValueInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('cartValue');

    fireEvent.blur(input);

    expect(screen.getByText('Please enter a valid number.')).toBeInTheDocument();
  });

  it('displays an error message when the value is invalid', () => {
    render(<CartValueInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('cartValue');

    fireEvent.change(input, { target: { value: '-5' } });
    fireEvent.blur(input);
    expect(screen.getByText('Please enter a valid number.')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.blur(input);
    expect(screen.getByText('Please enter a valid number.')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'e' } });
    fireEvent.blur(input);
    expect(screen.getByText('Please enter a valid number.')).toBeInTheDocument();
  });

  it('does not display an error message when the value is valid', () => {
    render(<CartValueInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('cartValue');

    fireEvent.change(input, { target: { value: '50' } });
    fireEvent.blur(input);

    expect(screen.queryByText('Please enter a valid number.')).toBeNull();
  });

  it('updates the inputValue state on input change', () => {
    render(<CartValueInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('cartValue') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '30' } });

    expect(input.value).toBe('30');
  });
});
