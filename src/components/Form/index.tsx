import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import CartValueInput from "../CartValueInput";
import DistanceInput from "../DistanceInput";
import NumOfItemsInput from "../NumOfItemsInput";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";

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
    console.log(cartValue)
    console.log(distance)
    console.log(numOfItems)
    console.log(time)
    console.log(date)
    e.currentTarget.reset();
  }
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <CartValueInput />
        <DistanceInput />
        <NumOfItemsInput />
        <DateInput />
        <TimeInput />
        <Button type="submit">Calculate Delivery Price</Button>
      </form>
      <Text>Delivery Price : {totalFee} €</Text>
    </Box>
  )
}
