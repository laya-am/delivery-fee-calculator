import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Form from '.';

test('renders MyComponent', () => {
    const mockSetTotalFee = jest.fn();

    render(<Form setTotalFee={mockSetTotalFee} />);
    expect(screen.getByText('Calculate Delivery Price')).toBeInTheDocument();
});