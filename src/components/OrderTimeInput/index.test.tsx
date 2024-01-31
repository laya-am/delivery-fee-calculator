import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import OrderTimeInput from ".";

describe("OrderTimeInput Component", () => {
  it("renders OrderTimeInput with a label and input field", () => {
    render(<OrderTimeInput />);
    expect(screen.getByLabelText(/order time/i)).toBeInTheDocument();
    expect(screen.getByTestId(/orderTime/i)).toBeInTheDocument();
  });

  it("displays the current date as the minimum value for the input field", () => {
    render(<OrderTimeInput />);
    const today = new Date().toISOString().split("T")[0];
    expect(screen.getByTestId(/orderTime/i).getAttribute("min")).toBe(
      `${today}T00:00`,
    );
  });
});
