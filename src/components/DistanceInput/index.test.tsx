import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DistanceInput from '.';

const mockOnDataValidityChange = jest.fn();
describe('DistanceInput', () => {
  it('renders without errors', () => {
    render(<DistanceInput onDataValidityChange={mockOnDataValidityChange} />);
    expect(screen.getByLabelText(/distance/i)).toBeInTheDocument();
  });

  it('displays an error message when there is no value given', () => {
    render(<DistanceInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('deliveryDistance');

    fireEvent.blur(input);

    expect(screen.getByText('Please enter a valid whole number.')).toBeInTheDocument();
  });

  it('displays an error message when the value is invalid', () => {
    render(<DistanceInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('deliveryDistance');

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
    render(<DistanceInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('deliveryDistance');

    fireEvent.change(input, { target: { value: '50' } });
    fireEvent.blur(input);

    expect(screen.queryByText('Please enter a valid number.')).toBeNull();
  });

  it('updates the inputValue state on input change', () => {
    render(<DistanceInput onDataValidityChange={mockOnDataValidityChange} />);
    const input = screen.getByTestId('deliveryDistance') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '30' } });

    expect(input.value).toBe('30');
  });
});
