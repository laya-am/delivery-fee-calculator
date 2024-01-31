import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function OrderTimeInput() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="orderTime">Order Time</FormLabel>
      <Input
        type="datetime-local"
        id="orderTime"
        name="orderTime"
        data-testid="orderTime"
        min={`${today}T00:00`}
      />
    </FormControl>
  );
}
