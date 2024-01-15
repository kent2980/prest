import React, { useState } from 'react';
import { Box, Heading, Input, VStack } from '@chakra-ui/react';
import StockSummaryList from '../components/list/StockSummaryList';

type Props = {
    setExplainId: React.Dispatch<React.SetStateAction<string>>;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    setConsolidationCat: React.Dispatch<React.SetStateAction<string>>;
}

const View = (props: Props) => {
    const { setExplainId, setCode, setConsolidationCat } = props;
    const [input, setInput] = useState(""); // Initializing input state

    const handleInputChange = (event: any) => {
        setInput(event.target.value); // Updating the input state with the entered value
    };

    return (
        <VStack
            spacing={6}>
            <Box marginTop={6} marginX={'auto'}>
                <Heading as='h5' size='md'>
                    Stock Code:{input ? input : "----"}
                </Heading>
            </Box>
            <Box margin={'auto'}>
                <Input
                    textAlign={'center'}
                    placeholder='Stock Code'
                    size='md'
                    value={input}
                    onChange={handleInputChange} // Binding the input value to the state and handling input changes
                />
            </Box>
            <Box>
                {/* <StockChart code={input}/> */}
            </Box>
            <Box width={'100%'}>
                <StockSummaryList code={input} setExplainId={setExplainId} setCode={setCode} setConsolidationCat={setConsolidationCat} />
            </Box>
        </VStack>
    )
}

export default View;
