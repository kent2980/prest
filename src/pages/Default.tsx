import { Box, Flex, Stack } from '@chakra-ui/react';
import React, { useState } from 'react'
import MainHeader from '../components/headers/MainHeader';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import View from './View';
import FinancialState from './FinancialState';

type Props = {}

const Default = (props: Props) => {
    const [explainId, setExplainId] = useState<string>("");
    return (
        <Stack direction={'column'}>
            <Flex
                as='header'
                position="sticky"
                bg={'white'}
                top={0}
                width="full"
                height={'64px'}
                shadow="sm"
                py={'16px'}
                px={'32px'}
                zIndex={'40'} // Ensure the header stays on top of other content
            >
                <MainHeader />
            </Flex>
            <Box as='main'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/view' element={<View setExplainId={setExplainId} />} />
                    <Route path='/financialstate' element={<FinancialState explainId={explainId} />} />
                </Routes>
            </Box>
        </Stack>
    )
}

export default Default;