import { Box, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function Form() {
  const [totalFee, setTotalFee] = useState(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const {cartValue , distance , numOfItems , time, date} = Object.fromEntries(formData);
    
    const cartSurcharge : number = +cartValue < 10 ? 10 - +cartValue : 0;
    const deliveryFee : number = 2 + (+distance > 1000 ? Math.floor((+distance - 1000)/500) : 0);
    const bulkFee : number = +numOfItems > 12 ? 1.2 : 0;
    const numOfItemsSurcharge : number = +numOfItems > 4 ? (+numOfItems - 4)* 0.5 : 0;
    
    setTotalFee(+cartValue >= 200 ? 0 :  Math.min(cartSurcharge + deliveryFee + bulkFee + numOfItemsSurcharge, 15));
    
    const hour = +time.slice(0,2);
    const day = new Date(date.toString()).getDay();
    (day === 5 && hour >= 15 && hour <= 18) ? setTotalFee(Math.min(totalFee * 1.2, 15)) : null;

    e.currentTarget.reset();
  }
  return (
    <Box>
      <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="cartValue">Cart Value</FormLabel>
          <Input type="number" id="cartValue" name="cartValue" /><span>EUR</span>
          <FormLabel htmlFor="distance">Delivery Distance</FormLabel>
          <Input type="number" id="distance" name="distance" /><span>meters</span>
          <FormLabel htmlFor="numOfItems">Number of Items</FormLabel>
          <Input type="number" id="numOfItems" name="numOfItems" />
          <FormLabel htmlFor="date">Date</FormLabel>
          <Input type="date" id="date" name="date" />
          <FormLabel htmlFor="time">Time</FormLabel>
          <Input type="time" id="time" name="time" />
          <button>Calculate Delivery Price</button>
      </form>
      <p>Delivery Price : {totalFee} EUR</p>
    </Box>
  )
}
