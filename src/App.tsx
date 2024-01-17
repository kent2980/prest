import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Default from './pages/Default';
import { TodoProvider } from './context/TodoContext';
import XbrlDataProvider from './context/XbrlDataContext';

export const App: React.FC = () => {

  return (
    <ChakraProvider>
      <XbrlDataProvider>
        <TodoProvider>
          <Default />
        </TodoProvider>
      </XbrlDataProvider>
    </ChakraProvider>
  );
};
