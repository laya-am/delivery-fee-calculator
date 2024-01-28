import { Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from 'react';
import { CalculationData } from '../../services/calculateFee';
import CartValueInput from "../CartValueInput";
import DistanceInput from "../DistanceInput";
import NumOfItemsInput from "../NumOfItemsInput";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import calculateFee from "../../services/calculateFee";

interface FormProps {
  setTotalFee: Dispatch<SetStateAction<number>>;
}

export default function Form({ setTotalFee }: FormProps ) {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: CalculationData = {
      cartValue: +formData.get('cartValue')!,
      distance: +formData.get('distance')!,
      numOfItems: +formData.get('numOfItems')!,
      time: formData.get('time') as string,
      date: formData.get('date') as string,
  };
    
    const newFee = calculateFee(data);
    setTotalFee(newFee);

    e.currentTarget.reset();
  }
  return (
      <form onSubmit={handleSubmit}>
        <CartValueInput />
        <DistanceInput />
        <NumOfItemsInput />
        <DateInput />
        <TimeInput />
        <Button type="submit">Calculate Delivery Price</Button>
      </form>
  )
}
