import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { useState, ChangeEvent } from "react";

export default function NumOfItemsInput() {
    const [inputValue, setInputValue] = useState<string>('')
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  
    const isError = isTouched && (inputValue === '' || +inputValue <= 0 || !Number.isInteger(+inputValue))
  return (
    <FormControl isInvalid={isError} isRequired>
        <FormLabel htmlFor="numOfItems">Number of Items</FormLabel>
        <Input type="number" id="numOfItems" name="numOfItems" value={inputValue} onChange={handleInputChange} onBlur={() => setIsTouched(true)} />
        {isError && <FormErrorMessage>Please enter a valid whole number.</FormErrorMessage>}
    </FormControl>
  )
}
