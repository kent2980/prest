import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Default from './pages/Default';

export const App: React.FC = () => {

  return (
    <ChakraProvider>
        <Default />
    </ChakraProvider>
  );
};
