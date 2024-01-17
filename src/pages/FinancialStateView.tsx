import React from 'react';
import { Center, VStack, Box } from '@chakra-ui/react';
import FinancialStateInfo from '../components/cards/FinanceStateInfo';
import CompanyInfo from '../components/cards/CompanyInfo';

type Props = {
    explainId: string;
    code: string;
    industry: string;
    setIndustry: React.Dispatch<React.SetStateAction<string>>;
    consolidationCat: string;
}

const FinancialStateView = (props: Props) => {
    const { explainId, code, industry, setIndustry, consolidationCat } = props;

    return (
        <Box>
            {code ? (
                <VStack>
                    <CompanyInfo code={code} setIndustry={setIndustry} />
                    <Center h="calc(100vh - 80px)">
                        <VStack spacing={10}>
                            {explainId ? (
                                <FinancialStateInfo explainId={explainId} industry={industry} consolidationCat={consolidationCat} />
                            ) : null}
                        </VStack>
                    </Center>
                </VStack>
            ) : null}
        </Box>
    )
}

export default FinancialStateView;
