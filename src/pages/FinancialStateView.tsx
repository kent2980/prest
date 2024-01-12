import React from 'react';
import { Center, VStack } from '@chakra-ui/react';
import FinancialStateInfo from '../components/cards/FinanceStateInfo';
import CompanyInfo from '../components/cards/CompanyInfo';

type Props = {
    explainId: string;
    code: string;
    industry: string;
    setIndustry: React.Dispatch<React.SetStateAction<string>>;
}

const FinancialStateView = (props: Props) => {
    const { explainId, code, industry, setIndustry } = props;

    return (
        <Center h="calc(100vh - 80px)">
            <VStack spacing={10}>
                {code ? (
                    <CompanyInfo code={code} setIndustry={setIndustry} />
                ) : null}
                {explainId ? (
                    <FinancialStateInfo explainId={explainId} industry={industry} />
                ) : null}
            </VStack>
        </Center>
    )
}

export default FinancialStateView;
