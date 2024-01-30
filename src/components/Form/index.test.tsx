import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from ".";

describe("Form Component", () => {
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

  it("submitting the form calls the calculateFee function with the correct data", async () => {
    const mockSetTotalFee = jest.fn();

    render(<Form setTotalFee={mockSetTotalFee} />);

    const calculateFeeMock = jest.requireMock(
      "../../services/calculateFee",
    ).default;

    userEvent.type(screen.getByLabelText(/cart value/i), "50");
    userEvent.type(screen.getByLabelText(/distance/i), "1000");
    userEvent.type(screen.getByLabelText(/number of items/i), "3");

    fireEvent.submit(screen.getByTestId("form"));

    // await waitFor(() => {
    //   expect(calculateFeeMock).toHaveBeenCalledTimes(1);
    // });

    expect(calculateFeeMock).toHaveBeenCalledWith({
      cartValue: 50,
      distance: 10,
      numOfItems: 3,
      orderTime: "",
    });

    expect(mockSetTotalFee).toHaveBeenCalledWith(2);
  });
});
