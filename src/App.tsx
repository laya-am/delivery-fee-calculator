import { Text, Flex, Box } from "@chakra-ui/react";
import Form from "./components/Form";
import { useState } from "react";

function App() {
  const [totalFee, setTotalFee] = useState(0);

  return (
    <Box margin="0 auto" padding="2rem" textAlign="center">
      <Flex justify="space-between" direction="column" gap="3rem">
        <Box flex="1">
          <Form data-testid="form" setTotalFee={setTotalFee} />
        </Box>
        <Box flex="1">
          <Text data-testid="fee">Delivery Price : {totalFee} €</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
