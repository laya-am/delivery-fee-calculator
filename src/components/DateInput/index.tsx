import { FormControl, FormLabel, Input } from "@chakra-ui/react"

export default function DateInput() {
  return (
    <FormControl isRequired>
        <FormLabel htmlFor="date">Date</FormLabel>
        <Input type="date" id="date" name="date" />
    </FormControl>
  )
}
