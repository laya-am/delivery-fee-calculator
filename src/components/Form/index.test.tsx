import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from ".";

describe("Form Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Form component with all the necessary inputs: CartValueInput, DistanceInput, NumOfItemsInput, OrderTimeInput and the Calculate Delivery Price button", () => {
    const mockSetTotalFee = jest.fn();

    render(<Form setTotalFee={mockSetTotalFee} />);
    expect(screen.getByTestId(/cartValue/i)).toBeInTheDocument();
    expect(screen.getByTestId(/deliveryDistance/i)).toBeInTheDocument();
    expect(screen.getByTestId(/numberOfItems/i)).toBeInTheDocument();
    expect(screen.getByTestId(/orderTime/i)).toBeInTheDocument();
    expect(screen.getByText(/Calculate Delivery Price/i)).toBeInTheDocument();
  });

  it("submitting the form calls handleSubmit and updates the totalFee state", () => {
    const mockSetTotalFee = jest.fn();

    render(<Form setTotalFee={mockSetTotalFee} />);

    fireEvent.submit(screen.getByTestId(/form/i));

    expect(mockSetTotalFee).toHaveBeenCalledTimes(1);
  });
});
