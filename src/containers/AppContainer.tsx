import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

interface AppContainerProps {
  children: ReactNode;
}

function AppContainer({ children }: AppContainerProps): JSX.Element {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
}

export default AppContainer;
