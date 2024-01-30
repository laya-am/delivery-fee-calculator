import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Form from '.';
// import calculateFee, { CalculationData } from '../../services/calculateFee';

jest.mock('../../services/calculateFee');

test('renders Form component with all the necessary inputs: CartValueInput, DistanceInput, NumOfItemsInput, OrderTimeInput and the Calculate Delivery Price button', () => {
    const mockSetTotalFee = jest.fn();

    render(<Form setTotalFee={mockSetTotalFee} />);
    expect(screen.getByTestId(/cartValue/i)).toBeInTheDocument();
    expect(screen.getByTestId(/deliveryDistance/i)).toBeInTheDocument();
    expect(screen.getByTestId(/numberOfItems/i)).toBeInTheDocument();
    expect(screen.getByTestId(/orderTime/i)).toBeInTheDocument();
    expect(screen.getByText(/Calculate Delivery Price/i)).toBeInTheDocument();
});

test('submitting the form calls handleSubmit and updates the totalFee state', () => {
    const mockSetTotalFee = jest.fn();
  
  render(<Form setTotalFee={mockSetTotalFee} />);
  
  fireEvent.submit(screen.getByTestId(/form/i));
  
  expect(mockSetTotalFee).toHaveBeenCalledTimes(1);
})

// test('submitting the form calls the calculateFee function with the correct data', () => {
    
//     const mockSetTotalFee = jest.fn();

//     render(<Form setTotalFee={mockSetTotalFee} />);

//     userEvent.type(screen.getByTestId(/cartValue/i), '8');
//     userEvent.type(screen.getByTestId(/deliveryDistance/i), '456');
//     userEvent.type(screen.getByTestId(/numberOfItems/i), '3');
//     userEvent.type(screen.getByTestId(/orderTime/i), '2022-01-01T12:00');

//     fireEvent.submit(screen.getByTestId('form'));

//     const expectedFormData: CalculationData = {
//     cartValue: 8,
//     distance: 456,
//     numOfItems: 3,
//     orderTime: '2022-01-01T12:00',
//     };

//     //this line doesn't work:
//     expect(calculateFee).toHaveBeenCalledWith(expectedFormData);

//     expect(mockSetTotalFee).toHaveBeenCalledWith(4);

//     jest.clearAllMocks();

// })