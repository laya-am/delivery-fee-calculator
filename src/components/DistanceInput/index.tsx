import { FormControl, FormLabel, Input, FormErrorMessage, Flex, Box, Text } from "@chakra-ui/react"
import { useState, useEffect, ChangeEvent } from "react";


interface DistanceInputProps {
    onDataValidityChange: (isValid: boolean) => void;
  }
 
export default function DistanceInput({ onDataValidityChange } : DistanceInputProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [isTouched, setIsTouched] = useState<boolean>(false);
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  
    const isError = isTouched && (inputValue === '' || +inputValue <= 0 || !Number.isInteger(+inputValue))
  
    useEffect(() => {
        onDataValidityChange(!isError);
      }, [isError]);

    return (
    <FormControl isInvalid={isError} isRequired>
        <FormLabel htmlFor="distance">Delivery Distance</FormLabel>
        <Flex>
            <Box flex="1">
                <Input
                    type="number"
                    id="distance"
                    name="distance"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={() => setIsTouched(true)}
                />
            </Box>
            <Box>
                <Text fontSize="md" ml="2">m</Text>
            </Box>
        </Flex>
        {isError && <FormErrorMessage>Please enter a valid whole number.</FormErrorMessage>}
    </FormControl>
  )
}
