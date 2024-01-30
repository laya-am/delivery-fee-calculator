import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { useState, useEffect, ChangeEvent } from "react";

interface NumOfItemsInputProps {
  onDataValidityChange: (isValid: boolean) => void;
}

export default function NumOfItemsInput({ onDataValidityChange } : NumOfItemsInputProps) {
    const [inputValue, setInputValue] = useState<string>('')
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  
    const isError = isTouched && (inputValue === '' || +inputValue <= 0 || !Number.isInteger(+inputValue))
  
    useEffect(() => {
      onDataValidityChange(!isError);
    }, [isError]);

    return (
    <FormControl isInvalid={isError} isRequired>
        <FormLabel htmlFor="numOfItems">Number of Items</FormLabel>
        <Input 
          type="number"
          id="numOfItems"
          name="numOfItems"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => setIsTouched(true)}
          data-testid="numberOfItems" />
        {isError && <FormErrorMessage>Please enter a valid whole number.</FormErrorMessage>}
    </FormControl>
  )
}
