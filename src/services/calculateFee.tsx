export interface CalculationData {
  cartValue: number;
  distance: number;
  numOfItems: number;
  orderTime: string;
}
const CART_VALUE_THRESHOLD = 10;
const DISTANCE_THRESHOLD = 1000;
const DISTANCE_SURCHARGE_UNIT = 500;
const ITEMS_SURCHARGE_THRESHOLD = 4;
const ITEMS_SURCHARGE_RATE = 0.5;
const BULK_ITEMS_THRESHOLD = 12;
const BULKFEE_SURCHARGE = 1.2;
const SURCHARGE_RATE = 1.2;
const MIN_FEE = 2;
const MAX_FEE = 15;
const FREE_DELIVERY_THRESHOLD = 200;
const HIGH_LOAD_DAY = 5;
const RUSH_HOUR_START = 15;
const RUSH_HOUR_END = 18;

export default function calculateFee(data: CalculationData): number {
  const { cartValue, distance, numOfItems, orderTime } = data;
  let newFee: number;

  const cartSurcharge: number =
    cartValue < CART_VALUE_THRESHOLD ? CART_VALUE_THRESHOLD - cartValue : 0;
  const deliveryFee: number =
    MIN_FEE +
    (distance > DISTANCE_THRESHOLD
      ? Math.ceil((distance - DISTANCE_THRESHOLD) / DISTANCE_SURCHARGE_UNIT)
      : 0);
  const numOfItemsSurcharge: number =
    numOfItems > ITEMS_SURCHARGE_THRESHOLD
      ? (numOfItems - ITEMS_SURCHARGE_THRESHOLD) * ITEMS_SURCHARGE_RATE
      : 0;
  const bulkFee: number =
    numOfItems > BULK_ITEMS_THRESHOLD ? BULKFEE_SURCHARGE : 0;

  newFee =
    cartValue >= FREE_DELIVERY_THRESHOLD
      ? 0
      : Math.min(
          cartSurcharge + deliveryFee + bulkFee + numOfItemsSurcharge,
          MAX_FEE
        );

  const date = orderTime.slice(0, 10);
  const time = orderTime.slice(11, 16);

  const hour = +time.slice(0, 2);
  const day = new Date(date).getDay();

  day === HIGH_LOAD_DAY && hour >= RUSH_HOUR_START && hour <= RUSH_HOUR_END
    ? (newFee = Math.min(newFee * SURCHARGE_RATE, MAX_FEE))
    : null;

  return newFee;
}
