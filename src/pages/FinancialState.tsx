import React, { useEffect, useState } from 'react';
import { ExplainItemApi, ExplainItemParams } from '../services/FsstockApiServies';
import { Box, Center, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, VStack } from '@chakra-ui/react';
import FinanceStateQuery from '../query/FinanceStateQuery';

type Props = {
    explainId: string;
}

const FinancialState = (props: Props) => {
    const { explainId } = props;
    const [items, setItems] = useState<FinanceStateQuery>();

    useEffect(() => {
        if (explainId !== "") {
            const list = new ExplainItemParams();
            list.explain = explainId;
            list.current_context = true;
            list.report_detail_cat = 'sm';
            ExplainItemApi.fetchData(list)
                .then(res => {
                    const states = new FinanceStateQuery(res);
                    setItems(states);
                })
        }
    }, [explainId]);

    return (
        <Center h="calc(100vh - 80px)">
            <VStack>
                {items ?
                    <StatGroup w={'300px'} border={'1px'} borderColor={'gray.300'} borderRadius={'10px'} padding={'10px'} >
                        <Stat>
                            <StatLabel>{items.setContextResultMember().getSales()[0].element_label}</StatLabel>
                            <StatNumber>{parseInt(items.setContextResultMember().getSales()[0].numeric).toLocaleString()}</StatNumber>
                            <StatHelpText>
                                <StatArrow type={parseFloat(items.setContextResultMember().getChangeInSales()[0].numeric) > 0 ? 'increase' : 'decrease'} />
                                {parseFloat(items.setContextResultMember().getChangeInSales()[0].numeric)}%
                            </StatHelpText>
                        </Stat>
                    </StatGroup>
                    : <Box></Box>}
            </VStack>
        </Center>
    )
}

export default FinancialState;
