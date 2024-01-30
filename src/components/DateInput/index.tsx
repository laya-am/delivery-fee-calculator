import { FormControl, FormLabel, Input } from "@chakra-ui/react"

export default function DateInput() {
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <FormControl isRequired>
        <FormLabel htmlFor="date">Date</FormLabel>
    </FormControl>
  )
}
