import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";

export interface CartValueInputProps {
  onDataValidityChange: (isValid: boolean) => void;
}

export default function CartValueInput({
  onDataValidityChange,
}: CartValueInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const isError = isTouched && (inputValue === "" || +inputValue <= 0);

  useEffect(() => {
    onDataValidityChange(!isError);
  }, [isError]);

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
            data-testid="cartValue"
          />
        </Box>
        <Box>
          <Text fontSize="md" ml="2">
            €
          </Text>
        </Box>
      </Flex>
      {isError && (
        <FormErrorMessage>Please enter a valid number.</FormErrorMessage>
      )}
    </FormControl>
  );
}
