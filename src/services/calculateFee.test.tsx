import calculateFee, { CalculationData } from "./calculateFee";

describe("calculateFee", () => {
  test("calculates fee with basic data", () => {
    const data: CalculationData = {
      cartValue: 15,
      distance: 1000,
      numOfItems: 3,
      orderTime: "2024-01-30T14:30:00",
    };

    const result = calculateFee(data);

    expect(result).toBe(2);
  });

  test("calculates fee with cart value surcharge", () => {
    const data: CalculationData = {
      cartValue: 7.2,
      distance: 1000,
      numOfItems: 3,
      orderTime: "2024-01-30T14:30:00",
    };

    const result = calculateFee(data);

    expect(result).toBe(4.8);
  });

  test("calculates fee with delivery distance surcharge", () => {
    const data1: CalculationData = {
      cartValue: 11,
      distance: 1499,
      numOfItems: 3,
      orderTime: "2024-01-30T14:30:00",
    };

    const result1 = calculateFee(data1);
    expect(result1).toBe(3);

    const data2: CalculationData = {
      cartValue: 11,
      distance: 1500,
      numOfItems: 3,
      orderTime: "2024-01-30T14:30:00",
    };

    const result2 = calculateFee(data2);
    expect(result2).toBe(3);

    const data3: CalculationData = {
      cartValue: 11,
      distance: 1501,
      numOfItems: 3,
      orderTime: "2024-01-30T14:30:00",
    };

    const result3 = calculateFee(data3);
    expect(result3).toBe(4);
  });

  test("calculates fee with numOfItems surcharge and bulkFee", () => {
    const data1: CalculationData = {
      cartValue: 10,
      distance: 1000,
      numOfItems: 10,
      orderTime: "2024-01-30T14:30:00",
    };

    const result1 = calculateFee(data1);

    expect(result1).toBe(5);

    const data2: CalculationData = {
      cartValue: 10,
      distance: 1000,
      numOfItems: 13,
      orderTime: "2024-01-30T14:30:00",
    };

    const result2 = calculateFee(data2);

    expect(result2).toBe(7.7);

    const data3: CalculationData = {
      cartValue: 10,
      distance: 1000,
      numOfItems: 14,
      orderTime: "2024-01-30T14:30:00",
    };

    const result3 = calculateFee(data3);

    expect(result3).toBe(8.2);
  });

  test("calculates fee with Friday and specific time", () => {
    const data: CalculationData = {
      cartValue: 15,
      distance: 1000,
      numOfItems: 3,
      orderTime: "2024-02-02T15:16:00",
    };

    const result = calculateFee(data);

    expect(result).toBe(2.4);
  });

  test("The delivery fee is never more than 15€", () => {
    const data: CalculationData = {
      cartValue: 2,
      distance: 10000,
      numOfItems: 30,
      orderTime: "2024-02-02T15:20:00",
    };

    const result = calculateFee(data);

    expect(result).toBe(15);
  });

  test("The delivery fee is 0€ when the cart value is equal or more than 200€", () => {
    const data: CalculationData = {
      cartValue: 200,
      distance: 1000,
      numOfItems: 3,
      orderTime: "2024-02-02T15:20:00",
    };

    const result = calculateFee(data);

    expect(result).toBe(0);
  });
});
