import { HiDocumentDuplicate } from "react-icons/hi";
import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { TodoContext, useContentContext, useTodoContext } from "../context/TodoContext";

type Props = {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const Home = (props: Props) => {

  const { todos, setTodos } = useTodoContext();

  const { content, setContent } = useContentContext();

  const { setCode } = props;

  useEffect(() => {
    setCode("");
  }, [])
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
        <Box>
          {todos[0].content}
        </Box>
      </VStack>
    </Center >
  )
}

export default Home;