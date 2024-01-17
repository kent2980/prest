import React, { useEffect, useState } from 'react';
import { Box, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import { ContextMember, ContextScale, FinanceStateQuery, ReportDetailCat, FinanceStateQueryBK, ElementLabel, FinanceStateQueryIR, UnitRef } from '../../query/FinanceStateQuery';
import { ExplainItemApi, ExplainItemDataItem, ExplainItemParams } from '../../services/FsstockApiServies';

type Props = {
    explainId: string;
    industry: string;
    consolidationCat: string;
}

const FinancialStateInfo = (props: Props) => {
    const { explainId, industry, consolidationCat } = props;
    const [items, setItems] = useState<FinanceStateQuery>();

    function getQuery(response: ExplainItemDataItem[]): FinanceStateQuery {
        console.log(industry);
        switch (industry) {
            case "7050":
                return new FinanceStateQueryBK(response);

            case "8050":
                return new FinanceStateQueryIR(response);

            default:
                return new FinanceStateQuery(response);
        }

    }

    function getItem(items: FinanceStateQuery, label: ElementLabel): ExplainItemDataItem {
        const item = items.setContextMenber(ContextMember.RESULT_MEMBER)
            .setContextScale(ContextScale.CURRENT)
            .setElementLabel(label)
            .setReportDetailCat(ReportDetailCat.SM)
            .setConsolidatedMember(consolidationCat)
            .item[0];

        return item;
    }

    function getNumeric(item: ExplainItemDataItem): number {
        if (item) {
            switch (item.unitref) {
                case UnitRef.JPY:
                    return parseInt(item.numeric);

                case UnitRef.PURE:
                case UnitRef.JPYPERSHARES:
                case UnitRef.NUMBEROFCOMPANIES:
                case UnitRef.SHARES:
                    return parseFloat(item.numeric);

                default:
                    return parseInt(item.numeric);
            }
        }
        return NaN;
    }

    useEffect(() => {
        if (explainId && industry && consolidationCat) {
            if (explainId !== "") {
                const list = new ExplainItemParams();
                list.explain = explainId;
                list.current_context = true;
                list.report_detail_cat = "sm"
                ExplainItemApi.fetchData(list, true)
                    .then(res => {
                        const states = getQuery(res);
                        setItems(states);
                    })
            }
        }
    }, [explainId, industry, consolidationCat]);

    return (
        <VStack>
            {items ?
                <StatGroup w={{ base: 'calc(100vw - 10vw)', sm: '500px' }} border={'1px'} borderColor={'gray.300'} borderRadius={'10px'} padding={'10px'} >
                    <Stat>
                        <StatLabel>売上高</StatLabel>
                        <StatNumber>{getNumeric(getItem(items, ElementLabel.売上高))?.toLocaleString()}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={getNumeric(getItem(items, ElementLabel.売上高変化率)) > 0 ? 'increase' : 'decrease'} />
                            {getNumeric(getItem(items, ElementLabel.売上高変化率))}%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>営業利益</StatLabel>
                        <StatNumber>{getNumeric(getItem(items, ElementLabel.営業利益))?.toLocaleString().toLocaleString()}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={getNumeric(getItem(items, ElementLabel.営業利益変化率)) > 0 ? 'increase' : 'decrease'} />
                            {getNumeric(getItem(items, ElementLabel.営業利益変化率))}%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>経常利益</StatLabel>
                        <StatNumber>{getNumeric(getItem(items, ElementLabel.経常利益)).toLocaleString()}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={getNumeric(getItem(items, ElementLabel.経常利益変化率)) > 0 ? 'increase' : 'decrease'} />
                            {getNumeric(getItem(items, ElementLabel.経常利益変化率))}%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>純利益</StatLabel>
                        <StatNumber>{getNumeric(getItem(items, ElementLabel.純利益)).toLocaleString()}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={parseFloat(getItem(items, ElementLabel.純利益変化率)?.numeric ?? "") > 0 ? 'increase' : 'decrease'} />
                            {getNumeric(getItem(items, ElementLabel.純利益変化率))}%
                        </StatHelpText>
                    </Stat>
                </StatGroup>
                : <Box></Box>}
        </VStack>
    )
}

export default FinancialStateInfo;
