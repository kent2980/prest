import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Default from './pages/Default';
import { TodoProvider } from './context/StockApiContext';

export const App: React.FC = () => {

  return (
    <ChakraProvider>
      <TodoProvider>
        <Default />
      </TodoProvider>
    </ChakraProvider>
  );
};
