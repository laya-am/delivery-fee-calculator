import { Button, Flex, Box } from "@chakra-ui/react";
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
      <form onSubmit={handleSubmit} data-testid="form">
        <Flex justify="space-between" direction="column" gap="1.5rem">
          <Box flex="1">
            <CartValueInput />
          </Box>
          <Box flex="1">
            <DistanceInput />
          </Box>
          <Box flex="1">
            <NumOfItemsInput />
          </Box>
          <Box flex="1">
            <DateInput />
          </Box>
          <Box flex="1">
            <TimeInput />
          </Box>
          <Box flex="1">
            <Button type="submit">Calculate Delivery Price</Button>
          </Box>
        </Flex>
      </form>
  )
}
