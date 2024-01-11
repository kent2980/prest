import { AiFillHome } from "react-icons/ai";
import { FaDharmachakra } from "react-icons/fa";
import { RiStockFill } from "react-icons/ri";
import { Flex, Heading, HStack, Icon, List, ListIcon, ListItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";

type Props = {
}

const MainHeader = (props: Props) => {
    const [url, setUrl] = useState("");
    const location = useLocation();

    useEffect(() => {
        setUrl(location.pathname);
    }, [location.pathname]);
    return (
        <Flex>
            <Link to={'/'}>
                <Flex left={{ base: 5, sm: 10 }} position={'fixed'}>
                    <Icon
                        as={FaDharmachakra}
                        w={{ base: 6, sm: 10 }}
                        h={{ base: 6, sm: 10 }}
                        color={'red.400'}
                        marginRight={{ base: 2, sm: 4 }}
                    />
                    <Heading
                        as={'h1'}
                        size={{ base: 'md', sm: 'lg' }}
                    >
                        Prest
                    </Heading>
                </Flex>
            </Link>
            <Flex right={{ base: 4, sm: 10 }} position={'fixed'}>
                <HStack spacing={{ base: 2, sm: 4 }}>
                    <List>
                        <HStack spacing={4}>
                            <ListItem
                                borderBottom={url === '/' ? '2px' : '0px'}
                                w={{ base: '80px', sm: '120px' }}
                                h={'30px'}
                                textAlign={'center'}
                                fontSize={{ base: '12px', sm: '16px' }}
                            >
                                <Link to={'/'}>
                                    <ListIcon as={AiFillHome} />
                                        Home
                                </Link>
                            </ListItem>
                            <ListItem
                                borderBottom={url === '/view' ? '2px' : '0px'}
                                w={{ base: '80px', sm: '120px' }}
                                h={'30px'}
                                textAlign={'center'}
                                fontSize={{ base: '12px', sm: '16px' }}
                            >
                                <Link to={'/view'}>
                                    <ListIcon as={RiStockFill} />
                                        StockData
                                </Link>
                            </ListItem>
                        </HStack>
                    </List>
                </HStack>
            </Flex>
        </Flex>
    )
}

export default MainHeader;