import { Button, Flex, Box } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from 'react';
import { CalculationData } from '../../services/calculateFee';
import CartValueInput from "../CartValueInput";
import DistanceInput from "../DistanceInput";
import NumOfItemsInput from "../NumOfItemsInput";
import OrderTimeInput from "../OrderTimeInput";
import calculateFee from "../../services/calculateFee";

interface FormProps {
  setTotalFee: Dispatch<SetStateAction<number>>;
}

export default function Form({ setTotalFee }: FormProps ) {

  const [inputValidity, setInputValidity] = useState({
    cartValue: true,
    distance: true,
    numOfItems: true,
  });
  console.log({inputValidity});


  function handleDataValidityChange(fieldName: string, isValid: boolean){
    setInputValidity(() => ({
      ...inputValidity,
      [fieldName]: isValid,
    }));
  };

  const isFormValid = Object.values(inputValidity).every((isValid) => isValid);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: CalculationData = {
      cartValue: +formData.get('cartValue')!,
      distance: +formData.get('distance')!,
      numOfItems: +formData.get('numOfItems')!,
      orderTime: formData.get('orderTime') as string,
  };

  console.log(data)
     
    if (!isFormValid) {
      console.log("not valid");
      return
    };
      
      const newFee = calculateFee(data);
      setTotalFee(newFee);

      // not sure if resetting the form makes a better user experience
      // e.currentTarget.reset();
    
  }
  return (
      <form onSubmit={handleSubmit} data-testid="form">
        <Flex justify="space-between" direction="column" gap="1.5rem">
          <Box flex="1">
            <CartValueInput onDataValidityChange={(isValid) => handleDataValidityChange('cartValue', isValid)} />
          </Box>
          <Box flex="1">
            <DistanceInput onDataValidityChange={(isValid) => handleDataValidityChange('distance', isValid)} />
          </Box>
          <Box flex="1">
            <NumOfItemsInput onDataValidityChange={(isValid) => handleDataValidityChange('numOfItems', isValid)} />
          </Box>
          <Box flex="1">
            <OrderTimeInput />
          </Box>
          <Box flex="1">
            <Button type="submit" isDisabled={!isFormValid}>Calculate Delivery Price</Button>
          </Box>
        </Flex>
      </form>
  )
}
