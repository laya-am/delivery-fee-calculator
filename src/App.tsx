import './App.css'
import { Text } from '@chakra-ui/react'
import Form from './components/Form'
import { useState } from 'react';

function App() {
  const [totalFee, setTotalFee] = useState(0);

  return (
    <div>
     <Form setTotalFee={setTotalFee} />
     <Text>Delivery Price : {totalFee} €</Text>
    </div>
  )
}

export default App
