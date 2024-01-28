import { FormControl, FormLabel, Input, FormErrorMessage, Flex, Box, Text } from "@chakra-ui/react"
import { useState, ChangeEvent } from "react"

export default function CartValueInput() {
    const [inputValue, setInputValue] = useState<string>('')
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  
    const isError = isTouched && (inputValue === '' || +inputValue <= 0)
    
  return (
    <FormControl isInvalid={isError} isRequired>
        <FormLabel htmlFor="cartValue">Cart Value</FormLabel>
        <Flex>
              <Box flex="1">
                  <Input
                      type="number"
                      id="cartValue"
                      name="cartValue"
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={() => setIsTouched(true)}
                  />
              </Box>
              <Box>
                  <Text fontSize="md" ml="2">€</Text>
              </Box>
          </Flex>
          {isError && <FormErrorMessage>Please enter a valid number.</FormErrorMessage>}
    </FormControl>
)
}
