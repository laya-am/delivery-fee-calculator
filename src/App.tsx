import { Text, Flex, Box, Heading } from "@chakra-ui/react";
import Form from "./components/Form";
import { useState } from "react";

function App() {
  const [totalFee, setTotalFee] = useState(0);

  return (
    <Flex
      justify="space-between"
      align="center"
      direction="column"
      gap="4rem"
      padding="2rem"
      textAlign="center"
      height="100vh"
    >
      <Heading color="#00C1E8">Delivery Fee Calculator</Heading>
      <Box flex="1">
        <Form data-testid="form" setTotalFee={setTotalFee} />
      </Box>
      <Box flex="1">
        <Text data-testid="fee" fontSize="1.6rem">
          Delivery Price : {totalFee} €
        </Text>
      </Box>
    </Flex>
  );
}

export default App;
