import { HiDocumentDuplicate } from "react-icons/hi";
import { Button, Center, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Props = {}

const Home = (props: Props) => {
  return (
    <Center h="calc(100vh - 80px)">
      <VStack spacing={5} margin={'auto'}>
        <Link to={'/view'}>
          <Button
            colorScheme='pink'
            variant='solid'
            w={'150px'}
            h={12}
            leftIcon={<HiDocumentDuplicate />}
            iconSpacing={2}
            >
            適時開示
          </Button>
        </Link>
      </VStack>
    </Center >
  )
}

export default Home;