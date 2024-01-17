import { Box, Flex, Stack } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import MainHeader from '../components/headers/MainHeader';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import View from './View';
import FinancialStateView from './FinancialStateView';
import { ExplainListContext } from '../context/XbrlDataContext';

type Props = {}

const Default = (props: Props) => {
    const [explainId, setExplainId] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [industry, setIndustry] = useState<string>("");
    const [consolidationCat, setConsolidationCat] = useState<string>("");

    const { explain } = useContext(ExplainListContext)

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
                    <Route path='/' element={<Home setCode={setCode} />} />
                    <Route path='/view' element={<View code={code} setExplainId={setExplainId} setCode={setCode} setConsolidationCat={setConsolidationCat} />} />
                    <Route path='/financialstate' element={<FinancialStateView explainId={explainId} code={code} industry={industry} setIndustry={setIndustry} consolidationCat={consolidationCat} />} />
                </Routes>
            </Box>
        </Stack>
    )
}

export default Default;