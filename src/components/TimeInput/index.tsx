import { FormControl, FormLabel, Input } from "@chakra-ui/react"

export default function TimeInput() {
  return (
    <FormControl isRequired>
        <FormLabel htmlFor="time">Time</FormLabel>
        <Input type="time" id="time" name="time" />
    </FormControl>
  )
}
