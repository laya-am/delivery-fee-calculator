import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders the component without errors', () => {
    render(<App />);
    expect(screen.getByTestId('fee')).toBeInTheDocument();
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('updates total fee when Form is submitted', () => {
    render(<App />);
    const form = screen.getByTestId('form');
    const totalFeeText = screen.getByTestId('fee');

    expect(totalFeeText).toHaveTextContent('Delivery Price : 0 €');

    fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '8' } });
    fireEvent.change(screen.getByTestId('deliveryDistance'), { target: { value: '1000' } });
    fireEvent.change(screen.getByTestId('numberOfItems'), { target: { value: '3' } });
    fireEvent.change(screen.getByTestId('orderTime'), { target: { value: '2022-01-01T12:00' } });
    fireEvent.submit(form);

    expect(totalFeeText).toHaveTextContent('Delivery Price : 4 €');
  });

  it('does not update total fee when Form is submitted with invalid value', () => {
    render(<App />); 
    const form = screen.getByTestId('form');
    const totalFeeText = screen.getByTestId('fee');
  
    fireEvent.change(screen.getByTestId('deliveryDistance'), { target: { value: '1000.25' } });
    fireEvent.blur(screen.getByTestId('deliveryDistance'));
    fireEvent.submit(form);
  
    expect(totalFeeText).toHaveTextContent('Delivery Price : 0 €');
  });
  
});
